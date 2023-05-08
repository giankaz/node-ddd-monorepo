import {
  CommonEntityValidator,
  CommonStatus,
  ValidatorFactory,
} from '../validators';
import { ValueObject, UniqueEntityId } from '../value-objects';
import { CoreError } from '../errors';

export abstract class Entity<Validator extends CommonEntityValidator> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(
    /**
     * All the entity props
     * @param {Validator}
     */
    public readonly props: Validator,

    /**
     * Pass the Class Validator of the entity
     * @param {Validator}
     */
    private readonly ClassValidator: { new (props: Validator): Validator },
  ) {
    this.uniqueEntityId = props?.id
      ? new UniqueEntityId(props.id)
      : new UniqueEntityId();

    this.props = {
      ...props,
      created_at: props?.created_at ? new Date(props.created_at) : new Date(),
      id: this.uniqueEntityId.value,
      name: props?.name,
      status: props?.status || CommonStatus.ACTIVE,
      updated_at: props?.updated_at ? new Date(props.updated_at) : null,
    };

    this.validate();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(newName: string) {
    this.props.name = newName;
    this.update();
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

  public validate(): boolean {
    const validatorProps = ValidatorFactory.create<Validator>();
    const isValidProps = validatorProps.validate(
      new this.ClassValidator(this.props),
    );
    if (!isValidProps) {
      throw new CoreError({
        message: validatorProps.errors.message,
        context: validatorProps.errors.context,
      });
    }

    return true;
  }

  public update() {
    this.validate();
    this.props.updated_at = new Date();
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

  toJSON(): Required<CommonEntityValidator & Validator> {
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
    ) as Required<CommonEntityValidator & Validator>;
  }
}
