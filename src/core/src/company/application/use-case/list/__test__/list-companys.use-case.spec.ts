import {
  Company,
  CompanyModel,
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../domain';
import { ListCompanysUseCase } from '../list-companys.use-case';
import { CompanyInMemoryRepository } from '../../../../infra';
import {
  CommonStatus,
  FilterOperators,
  SearchResult,
} from '../../../../../shared';
import { v4 as uuid } from 'uuid';
import { isBefore } from 'date-fns';

describe('List Companys UseCase Test', () => {
  let useCase: ListCompanysUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyInMemoryRepository();
    useCase = new ListCompanysUseCase.UseCase(repository);
  });
  it('toOutput method', async () => {
    const result = new SearchResult<
      CompanyModel,
      Company,
      CompanyRepositoryInterface.CompanyFields
    >({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = RandomCompanyFactory.createOne();

    const result2 = new SearchResult<
      CompanyModel,
      Company,
      CompanyRepositoryInterface.CompanyFields
    >({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase['toOutput'](result2);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should work with default search', async () => {
    const items = RandomCompanyFactory.createMultiple(2);

    const FAKE_ID = uuid();

    const sameIdItems = [
      RandomCompanyFactory.createOne({
        id: FAKE_ID,
      }),
      RandomCompanyFactory.createOne({
        id: FAKE_ID,
      }),
    ];

    repository.insertMany([...items, ...sameIdItems]);

    const output = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        search: '',
        filter: [],
        defaultSearch: { id: FAKE_ID },
      },
    });

    output.items.forEach((item) => {
      expect(item.id).toStrictEqual(FAKE_ID);
    });
  });

  it('should work the page and per_page methods', async () => {
    const FAKE_ID = uuid();
    const items = RandomCompanyFactory.createMultiple(21, {
      id: FAKE_ID,
    });

    repository.insertMany(items);

    const output = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        filter: [],
        defaultSearch: { id: FAKE_ID },
      },
    });
    output.items.forEach((item) => {
      expect(item.id).toStrictEqual(FAKE_ID);
    });

    expect(output.last_page).toStrictEqual(3);
    expect(output.total).toStrictEqual(21);
    expect(output.items.length).toStrictEqual(10);
  });

  it('should work with the sort methods', async () => {
    const items: Company[] = [];
    let day = 24; //hours

    for (let i = 0; i < 5; i++) {
      items.push(
        RandomCompanyFactory.createOne({
          created_at: new Date(Date.now() + 3600 * 1000 * day), //miliseconds of a day
        }),
      );
      day += 24; // another day
    }

    repository.insertMany(items);

    const output = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        sort: 'created_at',
        sort_dir: 'asc',
        search: '',
        filter: [],
      },
    });

    let atualItemCreatedAt = output.items[0].created_at;

    for (let i = 1; i < output.items.length; i++) {
      expect(
        isBefore(
          new Date(atualItemCreatedAt),
          new Date(output.items[i].created_at),
        ),
      ).toStrictEqual(true);
      atualItemCreatedAt = output.items[i].created_at;
    }

    const outputDesc = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        sort: 'created_at',
        sort_dir: 'desc',
        search: '',
        filter: [],
      },
    });

    let descAtualItemCreatedAt = outputDesc.items[0].created_at;

    for (let i = 1; i < outputDesc.items.length; i++) {
      expect(
        isBefore(
          new Date(outputDesc.items[i].created_at),
          new Date(descAtualItemCreatedAt),
        ),
      ).toStrictEqual(true);
      descAtualItemCreatedAt = outputDesc.items[i].created_at;
    }
  });

  it('should work the search method', async () => {
    const FAKE_ID = uuid();

    const items = RandomCompanyFactory.createMultiple(5, {
      name: FAKE_ID,
    });

    repository.insertMany(items);

    const output = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        sort: null,
        search: FAKE_ID,
        filter: [],
      },
    });

    expect(output.total).toStrictEqual(5);
    output.items.forEach((item) => {
      expect(item.name).toStrictEqual(FAKE_ID);
    });
  });

  it('should work the filter method', async () => {
    const FAKE_ID = uuid();

    const items = [
      RandomCompanyFactory.createOne({
        status: CommonStatus.INACTIVE,
      }),
      ...RandomCompanyFactory.createMultiple(4, {
        status: CommonStatus.ACTIVE,
        name: FAKE_ID,
      }),
      RandomCompanyFactory.createOne({
        status: CommonStatus.DELETED,
        name: FAKE_ID,
      }),
    ];

    repository.insertMany(items);

    const outputLinkTreeStatus = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        sort: null,
        search: '',
        filter: [
          {
            column: 'status',
            operator: FilterOperators.EQUAL,
            type: 'string',
            value: CommonStatus.INACTIVE,
          },
        ],
      },
    });

    outputLinkTreeStatus.items.forEach((item) => {
      expect(item.status).toStrictEqual(CommonStatus.INACTIVE);
    });

    const outputName = await useCase.execute({
      params: {
        page: 1,
        per_page: 10,
        sort: null,
        search: '',
        filter: [
          {
            column: 'name',
            operator: FilterOperators.CONTAINS,
            type: 'string',
            value: FAKE_ID,
          },
        ],
      },
    });

    outputName.items.forEach((item) => {
      expect(item.name).toStrictEqual(FAKE_ID);
    });
  });
});
