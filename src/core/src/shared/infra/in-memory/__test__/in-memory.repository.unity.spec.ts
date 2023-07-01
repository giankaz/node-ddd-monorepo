import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CommonEntityValidator, Entity } from '../../../domain';
import { InMemoryRepository } from '../in-memory.repository';

class StubEntityValidator extends CommonEntityValidator {
  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  name: string;

  constructor(props: StubEntityValidator) {
    super(props);
    Object.assign(this, props);
  }
}

class StubEntity extends Entity<StubEntityValidator> {
  static propsMap: Array<keyof StubEntityValidator> = ['price'];

  constructor(props: StubEntityValidator) {
    super(props, StubEntityValidator, StubEntity.propsMap);
  }

  get price(): number {
    return this.props.price;
  }

  get name(): string {
    return this.props.name;
  }
}

type StubFields = {} & Partial<
  keyof Pick<StubEntityValidator, keyof StubEntityValidator>
>;

type StubEntityProps = Pick<StubEntityValidator, keyof StubEntityValidator>;

class StubInMemoryRepository extends InMemoryRepository<
  StubEntityProps,
  StubEntity,
  StubFields
> {
  sortableFields: StubFields[] = ['name', 'created_at'];
  searchableFields: StubFields[] = ['name'];
  filterableFields: StubFields[] = ['name'];
}

describe('InMemoryRepository Tests', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  it('should inserts a new entity', async () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should return undefined when not found', async () => {
    const result = await repository.findById('fake id');
    expect(result).toBeUndefined();
  });

  it('should finds a entity by id', async () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should returns all entities', async () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it('should return undefined trying to update entity', async () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    const update = await repository.update(entity);
    expect(update).toBeUndefined();
  });

  it('should updates an entity', async () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    await repository.insert(entity);

    const entityUpdated = new StubEntity({
      price: 1,
      name: 'updated',
      id: entity.id,
    });
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should return undefined when entity not found', async () => {
    const result = await repository.delete('fake id');

    expect(result).toBeUndefined();
  });

  it('should deletes an entity', async () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
  });
});
