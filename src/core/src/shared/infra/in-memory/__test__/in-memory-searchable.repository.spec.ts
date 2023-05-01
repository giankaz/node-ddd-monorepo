import { IsNumber } from 'class-validator';
import {
  CommonEntityProps,
  Entity,
  FilterInMemory,
  FilterParams,
  FilterOperators,
  SearchParams,
  SearchResult,
  SortDirection,
} from '../../../domain';
import { InMemorySearchableRepository } from '../in-memory.repository';

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

class StubInMemorySearchableRepository extends InMemorySearchableRepository<
  StubEntityProps,
  StubEntity
> {
  sortableFields: string[] = ['name', 'created_at'];
  searchableFields: string[] = ['name'];
  filterableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: SearchParams,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }
    return FilterInMemory.parse<StubEntityProps, StubEntity>(items, filter, {
      searchableFields: this.searchableFields,
      defaultSearch: [],
    });
  }

  protected async applySort(
    items: StubEntity[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<StubEntity[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

describe('InMemorySearchableRepository Unit Tests', () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => (repository = new StubInMemorySearchableRepository()));

  describe('applyFilter method', () => {
    it('should filter using a filter param', async () => {
      const items = [
        new StubEntity(
          { price: 5 },
          {
            name: 'test',
          },
        ),
        new StubEntity(
          { price: 5 },
          {
            name: 'stubname',
          },
        ),
        new StubEntity(
          { price: 0 },
          {
            name: 'stubname',
          },
        ),
      ];

      const filter = [
        {
          type: 'string',
          column: 'name',
          operator: FilterOperators.CONTAINS,
          value: 'test',
        } as FilterParams,
      ];

      const params = new SearchParams({
        page: 1,
        per_page: 2,
        sort: 'created_at',
        sort_dir: 'asc',
        filter: filter,
        search: 'test',
      });
      repository.items = items;
      let itemsFiltered = await repository['applyFilter'](items, params);

      expect(itemsFiltered[0].toJSON()).toStrictEqual({
        id: items[0].id,
        name: 'test',
        price: 5,
      });

      const params2 = new SearchParams({
        page: 1,
        per_page: 2,
        sort: 'created_at',
        sort_dir: 'asc',
        filter: [],
        search: '',
      });

      itemsFiltered = await repository['applyFilter'](items, params2);
      expect(itemsFiltered).toHaveLength(3);
    });
  });

  describe('applySort method', () => {
    it('should not sort items', async () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'b' }),
        new StubEntity({ price: 5 }, { name: 'a' }),
      ];

      let itemsSorted = await repository['applySort'](items, null, null);
      expect(itemsSorted).toStrictEqual(items.reverse());

      itemsSorted = await repository['applySort'](items, 'price', 'asc');
      expect(itemsSorted).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'b' }),
        new StubEntity({ price: 5 }, { name: 'a' }),
        new StubEntity({ price: 5 }, { name: 'c' }),
      ];
      let itemsSorted = await repository['applySort'](items, 'name', 'asc');
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      itemsSorted = await repository['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'a' }),
        new StubEntity({ price: 5 }, { name: 'b' }),
        new StubEntity({ price: 5 }, { name: 'c' }),
        new StubEntity({ price: 5 }, { name: 'd' }),
        new StubEntity({ price: 5 }, { name: 'e' }),
      ];

      let itemsPaginated = await repository['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await repository['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await repository['applyPaginate'](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await repository['applyPaginate'](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe('search method', () => {
    it('should apply only paginate when other params are null', async () => {
      const entity = new StubEntity({ price: 5 }, { name: 'a' });
      const items = Array(15).fill(entity);
      repository.items = items;

      const params = new SearchParams({
        page: 1,
        per_page: 2,
      });

      const result = await repository.search(params);

      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(2).fill(entity),
          total: 15,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: null,
        }),
      );
    });

    it('should apply paginate and filter', async () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'test' }),
        new StubEntity({ price: 5 }, { name: 'a' }),
        new StubEntity({ price: 5 }, { name: 'TEST' }),
        new StubEntity({ price: 5 }, { name: 'TeSt' }),
      ];
      repository.items = items;

      const filter = [
        {
          type: 'string',
          column: 'name',
          operator: FilterOperators.EQUAL,
          value: 'test',
        } as FilterParams,
      ];

      const result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          sort: 'created_at',
          sort_dir: 'asc',
          filter: filter,
          search: 'test',
        }),
      );
      expect(result).toStrictEqual(
        new SearchResult<StubEntityProps, StubEntity>({
          items: [items[0]],
          total: 1,
          current_page: 1,
          per_page: 2,
          sort: 'created_at',
          sort_dir: 'asc',
          filter: [
            {
              column: 'name',
              operator: FilterOperators.EQUAL,
              type: 'string',
              value: 'test',
            },
          ],
        }),
      );
    });

    describe('should apply paginate and sort', () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'b' }),
        new StubEntity({ price: 5 }, { name: 'a' }),
        new StubEntity({ price: 5 }, { name: 'd' }),
        new StubEntity({ price: 5 }, { name: 'e' }),
        new StubEntity({ price: 5 }, { name: 'c' }),
      ];

      const arrange = [
        {
          search_params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
          }),
        },
        {
          search_params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
          }),
        },
        {
          search_params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
          }),
        },
        {
          search_params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
          }),
        },
      ];

      beforeEach(() => {
        repository.items = items;
      });

      test.each(arrange)(
        'when value is %j',
        async ({ search_params, search_result }) => {
          const result = await repository.search(search_params);
          expect(result).toStrictEqual(search_result);
        },
      );
    });

    it('should search using filter, sort and paginate', async () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'test' }),
        new StubEntity({ price: 5 }, { name: 'a' }),
        new StubEntity({ price: 5 }, { name: 'TEST' }),
        new StubEntity({ price: 5 }, { name: 'e' }),
        new StubEntity({ price: 5 }, { name: 'TeSt' }),
      ];

      repository.items = items;

      const arrange = [
        {
          search_params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[2], items[4]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
          }),
        },
        {
          search_params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[1], items[3]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: [],
          }),
        },
        {
          search_params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[0], items[3]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
          }),
        },
        {
          search_params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
            search: '',
          }),
          search_result: new SearchResult<StubEntityProps, StubEntity>({
            items: [items[1], items[4]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: [],
          }),
        },
      ];

      for (const i of arrange) {
        const result = await repository.search(i.search_params);
        expect(result).toStrictEqual(i.search_result);
      }
    });

    it('should search', async () => {
      const items = [
        new StubEntity({ price: 5 }, { name: 'test' }),
        new StubEntity({ price: 5 }, { name: 'a' }),
        new StubEntity({ price: 5 }, { name: 'TEST' }),
        new StubEntity({ price: 5 }, { name: 'e' }),
        new StubEntity({ price: 5 }, { name: 'TeSt' }),
      ];
      repository.items = items;

      const filter = [
        {
          type: 'string',
          column: 'name',
          operator: FilterOperators.CONTAINS,
          value: 'teste',
        } as FilterParams,
      ];

      const params = new SearchParams({
        page: 1,
        per_page: 2,
        sort: 'created_at',
        sort_dir: 'asc',
        filter: filter,
        search: 'teste',
      });
      const result = await repository.search(params);
    });
  });
});
