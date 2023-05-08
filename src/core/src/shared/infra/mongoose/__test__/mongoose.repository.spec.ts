import { v4 as uuid } from 'uuid';
import {
  FilterParams,
  FilterOperators,
  SearchParams,
  Entity,
  CommonEntityValidator,
  CommonStatus,
} from '../../../domain';
import { BaseSchemaFields, MongooseRepository } from '..';
import { IsNumber } from 'class-validator';
import { Document, Schema } from 'mongoose';

class StubEntityValidator extends CommonEntityValidator {
  @IsNumber()
  price: number;

  constructor(props: StubEntityValidator) {
    super(props);
    Object.assign(this, props);
  }
}

class StubEntity extends Entity<StubEntityValidator> {
  constructor(props: StubEntityValidator) {
    super(props, StubEntityValidator);
  }

  get price() {
    return this.props.price;
  }

  set price(newPrice: number) {
    this.props.price = newPrice;
    this.update();
  }
}
type StubEntityProps = Pick<StubEntityValidator, keyof StubEntityValidator>;

type Fields = 'name' | 'created_at' | 'id';

const stubSchema = new Schema<StubEntityProps, Document>({
  ...BaseSchemaFields,
  price: {
    type: Number,
    required: true,
  },
});

class StubRepository extends MongooseRepository<
  StubEntityProps,
  StubEntity,
  Fields
> {
  sortableFields: Fields[] = ['name', 'created_at'];
  searchableFields: Fields[] = ['name'];
  filterableFields: Fields[] = ['id', 'name'];

  constructor() {
    super({
      collectionName: 'stubs',
      modelName: 'Stub',
      Schema: stubSchema,
    });
  }

  public toEntity(model: StubEntityProps): StubEntity {
    return new StubEntity({
      price: model.price,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}

describe('mongoose repository tests', () => {
  let repository: StubRepository;
  let randomEntity: StubEntity;
  let randomEntity2: StubEntity;
  let randomEntity3: StubEntity;

  beforeEach(() => {
    repository = new StubRepository();
    randomEntity = new StubEntity({
      price: 5,
      created_at: new Date(),
      name: uuid(),
    });
    randomEntity2 = new StubEntity({
      price: 10,
      created_at: new Date(),
      name: uuid(),
    });
    randomEntity3 = new StubEntity({
      price: 15,
      created_at: new Date(),
      name: uuid(),
    });
  });

  it('should create with the insert method and find with findById', async () => {
    await repository.insert(randomEntity);

    const result = await repository.findById(randomEntity.id);

    expect(result.toJSON()).toStrictEqual(randomEntity.toJSON());
  });

  it('should find by field', async () => {
    await repository.insert(randomEntity);

    const result = await repository.findByField('price', randomEntity.price);

    expect(result.toJSON()).toStrictEqual(randomEntity.toJSON());
  });

  it('should inactivate, activate and softDelete', async () => {
    await repository.insert(randomEntity);

    let result = await repository.findById(randomEntity.id);

    await repository.inactivate(randomEntity.id);

    result = await repository.findById(randomEntity.id);

    expect(result.status).toStrictEqual(CommonStatus.INACTIVE);

    await repository.activate(randomEntity.id);

    result = await repository.findById(randomEntity.id);

    expect(result.status).toStrictEqual(CommonStatus.ACTIVE);

    await repository.softDelete(randomEntity.id);

    result = await repository.findById(randomEntity.id);

    expect(result.status).toStrictEqual(CommonStatus.DELETED);
  });

  it('should run the method search using filters', async () => {
    await repository.insertMany([randomEntity, randomEntity2, randomEntity3]);

    const filter: FilterParams<Fields>[] = [
      {
        column: 'name',
        operator: FilterOperators.CONTAINS,
        type: 'string',
        value: randomEntity.name,
      },
    ];

    const params = new SearchParams({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: filter,
    });

    const result = await repository.search(params);

    expect(randomEntity.toJSON()).toStrictEqual(result.items[0].toJSON());

    const filter2: FilterParams<Fields>[] = [
      {
        column: 'name',
        operator: FilterOperators.CONTAINS,
        type: 'string',
        value: randomEntity2.name,
      },
    ];

    const params2 = new SearchParams({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: filter2,
    });

    const result2 = await repository.search(params2);

    expect(randomEntity2.toJSON()).toStrictEqual(result2.items[0].toJSON());

    const filter3: FilterParams<Fields>[] = [
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: randomEntity.id,
      },
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: randomEntity2.id,
      },
    ];

    const params3 = new SearchParams({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: filter3,
    });

    const result3 = await repository.search(params3);

    expect(result3.items.length).toStrictEqual(2);

    result3.items.forEach((item) => {
      expect(
        [randomEntity2.id, randomEntity.id].includes(item.id),
      ).toStrictEqual(true);
    });
  });

  it(`should run the method search with multiple
  filters with same columns for more then one item, and multiple
  search for different columns`, async () => {
    await repository.insertMany([randomEntity, randomEntity2, randomEntity3]);

    const filter: FilterParams<Fields>[] = [
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: randomEntity.id,
      },
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: randomEntity2.id,
      },
    ];

    const params = new SearchParams({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: filter,
    });

    const result = await repository.search(params);

    expect(result.items.length).toStrictEqual(2);

    result.items.forEach((item) => {
      expect(
        [randomEntity.id, randomEntity2.id].includes(item.id),
      ).toStrictEqual(true);
    });

    const filter2: FilterParams<Fields>[] = [
      {
        column: 'name',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: String(randomEntity3.name),
      },
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: randomEntity3.id,
      },
    ];

    const params2 = new SearchParams({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: filter2,
    });

    const result2 = await repository.search(params2);

    expect(randomEntity3.toJSON()).toStrictEqual(result2.items[0].toJSON());
  });
  it('should run the method search using default search', async () => {
    await repository.insertMany([randomEntity, randomEntity2, randomEntity3]);

    const params = new SearchParams({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: [],
      defaultSearch: { _id: randomEntity.id },
    });

    const result = await repository.search(params);

    expect(result.items[0].toJSON()).toStrictEqual(randomEntity.toJSON());
  });

  it('should run the method search using search', async () => {
    await repository.insertMany([randomEntity, randomEntity2, randomEntity3]);

    const params = new SearchParams<Fields>({
      search: randomEntity.name,
    });

    const result = await repository.search(params);

    expect(result.items[0].id).toStrictEqual(randomEntity.id);
  });

  it('should run the method update', async () => {
    await repository.insert(randomEntity);

    const entity = await repository.findById(randomEntity.id);

    const NEW_NAME = 'NEW_NAME';
    const NEW_PRICE = 100;

    entity.name = NEW_NAME;
    entity.price = NEW_PRICE;

    await repository.update(entity);

    const foundAfterUpdate = await repository.findById(entity.id);

    expect(foundAfterUpdate.toJSON()).toStrictEqual(entity.toJSON());
    expect(foundAfterUpdate.name).toStrictEqual(NEW_NAME);
    expect(foundAfterUpdate.price).toStrictEqual(NEW_PRICE);
  });

  it('should delete', async () => {
    await repository.insert(randomEntity);

    await repository.delete(randomEntity.id);

    const result = await repository.findById(randomEntity.id);
    expect(result).toBeUndefined();
  });
});
