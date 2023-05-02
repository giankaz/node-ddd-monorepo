import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntityProps, Entity } from '../../entities';
import { ValidatorFields } from '../validator-fields';
import * as classValidator from 'class-validator';

class StubValidatorFields extends ValidatorFields<{
  field: string;
}> {}

class StubEntityProps {
  @IsString()
  @IsNotEmpty()
  stub: string;

  @IsNumber()
  price: number;

  constructor(props: StubEntityProps) {
    Object.assign(this, props);
  }
}

class StubEntity extends Entity<StubEntityProps> implements StubEntityProps {
  constructor(props: StubEntityProps, commonProps?: CommonEntityProps) {
    super(props, StubEntityProps, commonProps);
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
    expect(validator.errors).toStrictEqual({ field: ['some error'] });
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

  // it('should throw error on invalid entity', () => {
  //   expect(() => {
  //     new StubEntity({} as unknown as StubEntityProps);
  //   }).toThrowError();
  // });

  // it('should throw error on invalid entity update on common and other props', () => {
  //   const entity = new StubEntity({
  //     price: 10,
  //     stub: 'stub',
  //   });

  //   expect(() => {
  //     entity.changeName(354543 as unknown as string);
  //   }).toThrowError();
  // });
});
