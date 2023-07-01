import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity } from '../../entities';
import { ValidatorFields } from '../validator-fields';
import * as classValidator from 'class-validator';
import { CommonEntityValidator } from '../common.validator';

class StubValidatorFields extends ValidatorFields<{
  field: string;
}> {}

class StubEntityValidator extends CommonEntityValidator {
  @IsString()
  @IsNotEmpty()
  stub: string;

  @IsNumber()
  price: number;

  constructor(props: StubEntityValidator) {
    super(props);
    Object.assign(this, props);
  }
}

class StubEntity
  extends Entity<StubEntityValidator>
  implements StubEntityValidator
{
  static propsMap: Array<keyof StubEntityValidator> = ['price', 'stub'];

  constructor(props: StubEntityValidator) {
    super(props, StubEntityValidator, StubEntity.propsMap);
  }

  get stub() {
    return this.props.stub;
  }

  get price() {
    return this.props.price;
  }
}

describe('ValidatorFields Tests', () => {
  it('should initialize errors and validatedData variables with null', () => {
    const validator = new StubValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'some error' } },
    ]);
    const validator = new StubValidatorFields();
    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors?.context).toStrictEqual('field');
    expect(validator.errors?.message).toStrictEqual('some error');
  });

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const validator = new StubValidatorFields();
    expect(validator.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toStrictEqual({ field: 'value' });
    expect(validator.errors).toBeNull();
  });

  it('should validate an entity', () => {
    const entity = new StubEntity({
      price: 10,
      stub: 'stub',
    });

    expect(entity.id).toBeDefined();
  });
});
