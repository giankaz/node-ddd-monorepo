import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ValidatorFields } from '../validators';
import { ValueObject, UniqueEntityId } from '../value-objects';
import { CoreError } from '../errors';
import { classValidatorErrorParse } from '../../utils';

export enum CommonStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export class CommonEntityModel {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(CommonStatus)
  @IsOptional()
  status?: CommonStatus;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date | null;

  constructor(props: CommonEntityModel) {
    for (const key in props) {
      if (key in CommonEntityModel) {
        Object.assign(this, props);
      }
    }
  }
}

export abstract class Entity<Model extends CommonEntityModel> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(
    /**
     * All the entity props
     * @param {Model}
     */
    public readonly props: Model,

    /**
     * Pass the Class Model of the entity
     * @param {Model}
     */
    private readonly ClassModel: { new (props: Model): Model },
  ) {
    this.uniqueEntityId = props?.id
      ? new UniqueEntityId(props.id)
      : new UniqueEntityId();

    this.props = {
      ...props,
      created_at: props?.created_at || new Date(),
      id: this.uniqueEntityId.value,
      name: props?.name,
      status: props?.status || CommonStatus.ACTIVE,
      updated_at: props?.updated_at || null,
    };

    this.validate();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  get name(): string {
    return this.props.name;
  }

  get status(): CommonStatus {
    return this.props.status;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date | null {
    return this.props.updated_at;
  }
  1;

  public validate(): boolean {
    const validatorProps = new ValidatorFields();
    const isValidProps = validatorProps.validate(
      new this.ClassModel(this.props),
    );

    if (!isValidProps) {
      throw new CoreError({
        message: classValidatorErrorParse(validatorProps.errors),
      });
    }

    return true;
  }

  public update() {
    this.validate();
    this.props.updated_at = new Date();
  }

  public changeName(newName: string) {
    this.props.name = newName;
    this.update();
  }

  public activate() {
    this.props.status = CommonStatus.ACTIVE;
    this.update();
  }

  public softDelete() {
    this.props.status = CommonStatus.DELETED;
    this.update();
  }

  public inactivate() {
    this.props.status = CommonStatus.INACTIVE;
    this.update();
  }

  public isActive = () => this.status === CommonStatus.ACTIVE;

  public isSoftDeleted = () => this.status === CommonStatus.DELETED;

  public isInactive = () => this.status === CommonStatus.INACTIVE;

  toJSON(): Required<CommonEntityModel & Model> {
    const data = {};
    for (const key of Object.keys(this.props || {})) {
      if (this.props[key] instanceof ValueObject) {
        data[key] = this.props[key].toJSON();
      } else if (
        Array.isArray(this.props[key]) &&
        this.props[key].every((prop) => prop instanceof ValueObject)
      ) {
        data[key] = this.props[key].map((prop) => prop.toJSON());
      } else {
        data[key] = this.props[key];
      }
    }

    return JSON.parse(
      JSON.stringify({
        id: this.id,
        ...data,
      }),
    ) as Required<CommonEntityModel & Model>;
  }
}
