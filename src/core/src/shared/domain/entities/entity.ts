import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ValidatorFields } from '../validators';
import { ValueObject, UniqueEntityId } from '../value-objects';

export enum CommonStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export class CommonEntityProps {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(CommonStatus)
  status?: CommonStatus;

  @IsDate()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date | null;

  constructor(props: CommonEntityProps) {
    Object.assign(this, props);
  }
}

export abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(
    public readonly props: Props,
    public readonly Rules: { new (props: Props): Props },
    private readonly commonProps?: CommonEntityProps,
  ) {
    this.uniqueEntityId = commonProps?.id
      ? new UniqueEntityId(commonProps.id)
      : new UniqueEntityId();

    this.commonProps = {
      created_at: commonProps?.created_at || new Date(),
      updated_at: commonProps?.updated_at || null,
      id: this.uniqueEntityId.value,
      name: commonProps?.name,
      status: commonProps?.status || CommonStatus.ACTIVE,
    };

    this.validate();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  get name(): string {
    return this.commonProps.name;
  }

  get status(): CommonStatus {
    return this.commonProps.status;
  }

  get created_at(): Date {
    return this.commonProps.created_at;
  }

  get updated_at(): Date | null {
    return this.commonProps.updated_at;
  }

  public validate(): boolean {
    const validatorProps = new ValidatorFields();
    const isValidProps = validatorProps.validate(new this.Rules(this.props));
    const validatorCommonProps = new ValidatorFields();
    const isValidCommonProps = validatorCommonProps.validate(
      new CommonEntityProps({
        created_at: this.created_at,
        id: this.id,
        name: this.name,
        status: this.status,
        updated_at: this.updated_at,
      }),
    );

    if (!isValidProps || !isValidCommonProps) {
      throw new Error();
    }

    return true;
  }

  public update() {
    this.validate();
    this.commonProps.updated_at = new Date();
  }

  public changeName(newName: string) {
    this.commonProps.name = newName;
    this.update();
  }

  public activate() {
    this.commonProps.status = CommonStatus.ACTIVE;
    this.update();
  }

  public softDelete() {
    this.commonProps.status = CommonStatus.DELETED;
    this.update();
  }

  public inactivate() {
    this.commonProps.status = CommonStatus.INACTIVE;
    this.update();
  }

  public isActive = () => this.status === CommonStatus.ACTIVE;

  public isSoftDeleted = () => this.status === CommonStatus.DELETED;

  public isInactive = () => this.status === CommonStatus.INACTIVE;

  toJSON(): Required<CommonEntityProps & Props> {
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

    for (const key of Object.keys(this.commonProps || {})) {
      if (this.commonProps[key] instanceof ValueObject) {
        data[key] = this.commonProps[key].toJSON();
      } else if (
        Array.isArray(this.commonProps[key]) &&
        this.commonProps[key].every((prop) => prop instanceof ValueObject)
      ) {
        data[key] = this.commonProps[key].map((prop) => prop.toJSON());
      } else {
        data[key] = this.commonProps[key];
      }
    }

    return JSON.parse(
      JSON.stringify({
        id: this.id,
        ...data,
      }),
    ) as Required<CommonEntityProps & Props>;
  }
}
