import { IsNumber } from 'class-validator';
import {
  CommonEntityProps,
  Entity,
  NoEntityErrorStandardization,
  NotFoundError,
  UniqueEntityId,
} from '../../../domain';
import { InMemoryRepository } from '../in-memory.repository';

class StubEntityProps {
  @IsNumber()
  price: number;

  constructor(props: StubEntityProps) {
    Object.assign(this, props);
  }
}

class StubEntity extends Entity<StubEntityProps> {
  constructor(
    public readonly props: StubEntityProps,
    commonProps?: CommonEntityProps,
  ) {
    super(props, StubEntityProps, commonProps);
  }

  get price(): number {
    return this.props.price;
  }
}

class StubInMemoryRepository extends InMemoryRepository<
  StubEntityProps,
  StubEntity
> {}

describe('InMemoryRepository Tests', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  it('should inserts a new entity', async () => {
    const entity = new StubEntity({ price: 5 }, { name: 'name value' });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throws error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(
        NoEntityErrorStandardization.not_found.ABSTRACT_ENTITY_NOT_FOUND,
      ),
    );

    await expect(
      repository.findById(
        new UniqueEntityId('9366b7dc-2d71-4799-b91c-c64adb205104'),
      ),
    ).rejects.toThrow(
      new NotFoundError(
        NoEntityErrorStandardization.not_found.ABSTRACT_ENTITY_NOT_FOUND,
      ),
    );
  });

  it('should finds a entity by id', async () => {
    const entity = new StubEntity({ price: 5 }, { name: 'name value' });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should returns all entities', async () => {
    const entity = new StubEntity({ price: 5 }, { name: 'name value' });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it('should throws error on update when entity not found', () => {
    const entity = new StubEntity({ price: 5 }, { name: 'name value' });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(
        NoEntityErrorStandardization.not_found.ABSTRACT_ENTITY_NOT_FOUND,
      ),
    );
  });

  it('should updates an entity', async () => {
    const entity = new StubEntity({ price: 5 }, { name: 'name value' });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { price: 1 },
      { name: 'updated', id: entity.uniqueEntityId },
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throws error on delete when entity not found', () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError(
        NoEntityErrorStandardization.not_found.ABSTRACT_ENTITY_NOT_FOUND,
      ),
    );

    expect(
      repository.delete(
        new UniqueEntityId('9366b7dc-2d71-4799-b91c-c64adb205104'),
      ),
    ).rejects.toThrow(
      new NotFoundError(
        NoEntityErrorStandardization.not_found.ABSTRACT_ENTITY_NOT_FOUND,
      ),
    );
  });

  it('should deletes an entity', async () => {
    const entity = new StubEntity({ price: 5 }, { name: 'name value' });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
