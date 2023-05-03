import { ActivityMongoRepository } from '../';
import {
  CommonStatus,
  FilterOperators,
  FilterParams,
  RepositoryInterface,
  SearchParams,
} from '../../../../shared';
import {
  Activity,
  ActivityModel,
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../domain';

describe('mongoose repository tests', () => {
  let repository: RepositoryInterface<
    ActivityModel,
    Activity,
    ActivityRepositoryInterface.ActivityFields
  >;
  let randomEntity: Activity;

  beforeEach(() => {
    repository = new ActivityMongoRepository();
    randomEntity = RandomActivityFactory.createOne();
  });

  it('should create with the insert method and find with findById', async () => {
    await repository.insert(randomEntity);

    const result = await repository.findById(randomEntity.id);

    expect(result.toJSON()).toStrictEqual(randomEntity.toJSON());
  });

  it('should find by field', async () => {
    await repository.insert(randomEntity);

    const result = await repository.findByField('name', randomEntity.name);

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
    const entities = RandomActivityFactory.createMultiple(10);

    const entityToWorkWith1 = entities[0];
    const entityToWorkWith2 = entities[1];

    await repository.insertMany(entities);

    const filter: FilterParams<ActivityRepositoryInterface.ActivityFields>[] = [
      {
        column: 'name',
        operator: FilterOperators.CONTAINS,
        type: 'string',
        value: entityToWorkWith1.name,
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

    expect(entityToWorkWith1.toJSON()).toStrictEqual(result.items[0].toJSON());

    const filter2: FilterParams<ActivityRepositoryInterface.ActivityFields>[] =
      [
        {
          column: 'name',
          operator: FilterOperators.CONTAINS,
          type: 'string',
          value: entityToWorkWith2.name,
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

    expect(entityToWorkWith2.toJSON()).toStrictEqual(result2.items[0].toJSON());

    const filter3: FilterParams<ActivityRepositoryInterface.ActivityFields>[] =
      [
        {
          column: 'id',
          operator: FilterOperators.EQUAL,
          type: 'string',
          value: entityToWorkWith1.id,
        },
        {
          column: 'id',
          operator: FilterOperators.EQUAL,
          type: 'string',
          value: entityToWorkWith2.id,
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
        [entityToWorkWith1.id, entityToWorkWith2.id].includes(item.id),
      ).toStrictEqual(true);
    });
  });

  it(`should run the method search with multiple
  filters with same columns for more then one item, and multiple
  search for different columns`, async () => {
    const entities = RandomActivityFactory.createMultiple(10);

    await repository.insertMany(entities);

    const entityToWorkWith1 = entities[0];
    const entityToWorkWith2 = entities[1];

    const filter: FilterParams<ActivityRepositoryInterface.ActivityFields>[] = [
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: entityToWorkWith1.id,
      },
      {
        column: 'id',
        operator: FilterOperators.EQUAL,
        type: 'string',
        value: entityToWorkWith2.id,
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
        [entityToWorkWith1.id, entityToWorkWith2.id].includes(item.id),
      ).toStrictEqual(true);
    });
  });
  it('should run the method search using default search', async () => {
    const entities = RandomActivityFactory.createMultiple(10);

    await repository.insertMany(entities);

    const entityToWorkWith1 = entities[0];

    const params = new SearchParams<ActivityRepositoryInterface.ActivityFields>(
      {
        page: 1,
        per_page: 2,
        sort: 'created_at',
        sort_dir: 'asc',
        filter: [],
        defaultSearch: { _id: entityToWorkWith1.id },
      },
    );

    const result = await repository.search(params);

    expect(result.items[0].toJSON()).toStrictEqual(entityToWorkWith1.toJSON());
  });

  it('should run the method search using search', async () => {
    const entities = RandomActivityFactory.createMultiple(10);

    await repository.insertMany(entities);

    const entityToWorkWith1 = entities[0];

    const params = new SearchParams<ActivityRepositoryInterface.ActivityFields>(
      {
        search: entityToWorkWith1.name,
      },
    );

    const result = await repository.search(params);

    expect(result.items[0].id).toStrictEqual(entityToWorkWith1.id);
  });

  it('should run the method update', async () => {
    await repository.insert(randomEntity);

    const entity = await repository.findById(randomEntity.id);

    const NEW_NAME = 'NEW_NAME';

    entity.name = NEW_NAME;

    await repository.update(entity);

    const foundAfterUpdate = await repository.findById(entity.id);

    expect(foundAfterUpdate.toJSON()).toStrictEqual(entity.toJSON());
    expect(foundAfterUpdate.name).toStrictEqual(NEW_NAME);
  });

  it('should delete', async () => {
    await repository.insert(randomEntity);

    await repository.delete(randomEntity.id);

    expect(async () => {
      await repository.findById(randomEntity.id);
    }).rejects.toThrow();
  });
});
