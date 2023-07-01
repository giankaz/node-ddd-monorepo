import { Entity } from '../entity';
import {
  CommonEntityValidator,
  CommonStatus,
  UniqueEntityId,
} from '../../../domain';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

class StubEntity extends Entity<StubEntityValidator> {
  static propsMap: Array<keyof StubEntityValidator> = ['price', 'stub'];

  constructor(props: StubEntityValidator) {
    super(props, StubEntityValidator, StubEntity.propsMap);
  }
}

describe('Entity Test', () => {
  it('should convert to JSON', async () => {
    const entity = new StubEntity({ stub: 'stub', price: 5 });
    expect(entity.toJSON()).toEqual(
      expect.objectContaining({ id: entity.id, stub: 'stub', price: 5 }),
    );
  });

  it('should creates an UUID id', async () => {
    const entity = new StubEntity({ stub: 'stub', price: 5 });
    expect(entity.id).toBeDefined();
  });

  it('should creates the created_at field', async () => {
    const entity = new StubEntity({ stub: 'stub', price: 5 });
    expect(entity.created_at).toBeDefined();
    expect(entity.created_at.getDate()).toStrictEqual(new Date().getDate());
  });

  it('should creates the updated_at field as null', async () => {
    const entity = new StubEntity({ stub: 'stub', price: 5 });
    expect(entity.updated_at).toBeNull();
  });

  it('should create being able to pass the common fields', async () => {
    const fake_id = new UniqueEntityId().value;
    const mockDate = new Date('2000-10-10');
    const mockCommon: CommonEntityValidator = {
      id: fake_id,
      status: CommonStatus.INACTIVE,
      created_at: mockDate,
      updated_at: mockDate,
    };
    const entity = new StubEntity({ stub: 'stub', price: 5, ...mockCommon });
    for (const key in mockCommon) {
      if (key === 'id') {
        expect(entity[key]).toStrictEqual(fake_id);
      } else {
        expect(entity[key]).toStrictEqual(mockCommon[key]);
      }
    }
  });
});
