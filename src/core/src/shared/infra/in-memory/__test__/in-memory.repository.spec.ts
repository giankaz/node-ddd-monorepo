import { IsNumber } from 'class-validator';
import { CommonEntityModel, CoreError, Entity } from '../../../domain';
import { InMemoryRepository } from '../in-memory.repository';

class StubEntityModel extends CommonEntityModel {
  @IsNumber()
  price: number;

  constructor(props: StubEntityModel) {
    super(props);
    Object.assign(this, props);
  }
}

class StubEntity extends Entity<StubEntityModel> {
  constructor(props: StubEntityModel) {
    super(props, StubEntityModel);
  }

  get price(): number {
    return this.props.price;
  }
}

type StubFields = {} & Partial<
  keyof Pick<StubEntityModel, keyof StubEntityModel>
>;

class StubInMemoryRepository extends InMemoryRepository<
  StubEntityModel,
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

  it('should throws error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new CoreError({
        message: 'item not found',
      }),
    );

    await expect(
      repository.findById('9366b7dc-2d71-4799-b91c-c64adb205104'),
    ).rejects.toThrow(
      new CoreError({
        message: 'item not found',
      }),
    );
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

  it('should throws error on update when entity not found', () => {
    const entity = new StubEntity({ price: 5, name: 'name value' });
    expect(repository.update(entity)).rejects.toThrow(
      new CoreError({
        message: 'item not found',
      }),
    );
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

  it('should throws error on delete when entity not found', () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new CoreError({
        message: 'item not found',
      }),
    );

    expect(
      repository.delete('9366b7dc-2d71-4799-b91c-c64adb205104'),
    ).rejects.toThrow(
      new CoreError({
        message: 'item not found',
      }),
    );
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
