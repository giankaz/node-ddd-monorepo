import {
  CoreError,
  Entity,
  FilterInMemory,
  FilterOperators,
  FilterParams,
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from '../../domain';

export abstract class InMemoryRepository<
  Props,
  E extends Entity<Props>,
  Fields extends string,
> implements RepositoryInterface<Props, E, Fields>
{
  items: E[] = [];
  abstract sortableFields: Fields[];
  abstract searchableFields: Fields[];
  abstract filterableFields: Fields[];

  async search(
    props: SearchParams<Fields>,
  ): Promise<SearchResult<Props, E, Fields>> {
    const itemsFiltered =
      !props ||
      (!props.defaultSearch &&
        !props.defaultSearchOrExpressions &&
        !props.filter &&
        !props.search)
        ? this.items
        : await this.applyFilter(this.items, props);

    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir,
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page,
    );
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  public async applyFilter(
    items: E[],
    filter: SearchParams<Fields>,
  ): Promise<E[]> {
    if (!filter) {
      return items;
    }

    const defaultSearch = filter.defaultSearch
      ? Object.keys(filter.defaultSearch).map(
          (key) =>
            ({
              column: key,
              operator: FilterOperators.EQUAL,
              type: typeof filter.defaultSearch[key],
              value: filter?.defaultSearch ? filter.defaultSearch[key] : [],
            } as FilterParams<Fields>),
        )
      : [];

    return FilterInMemory.parse<Props, E, Fields>(items, filter, {
      searchableFields: this.searchableFields,
      defaultSearch,
    });
  }

  public async applySort(
    items: E[],
    sort: Fields | null,
    sort_dir: SortDirection | null,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }
    const sortAsKeyofE = sort as keyof E;

    return [...items].sort((a, b) => {
      if (a[sortAsKeyofE] < b[sortAsKeyofE]) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (a[sortAsKeyofE] > b[sortAsKeyofE]) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams<Fields>['page'],
    per_page: SearchParams<Fields>['per_page'],
  ): Promise<E[]> {
    const start = (page - 1) * per_page; // 1 * 15 = 15
    const limit = start + per_page; // 15 + 15 = 30
    return items.slice(start, limit);
  }

  async insert(entity: E): Promise<E> {
    this.items.push(entity);
    return entity;
  }

  async insertMany(entities: E[]): Promise<E[]> {
    this.items = [...this.items, ...entities];
    return entities;
  }

  async findById(id: string): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findByField(field: keyof Props, value: unknown): Promise<E> {
    return this.items.find((item) => item.toJSON()[field] === value);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<E> {
    const foundEntity = await this._get(entity.id);
    if (!foundEntity) return;
    const indexFound = this.items.findIndex((i) => i.id === entity.id);
    this.items[indexFound] = entity;
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    const _id = `${id}`;
    const item = await this._get(_id);
    if (!item) {
      return;
    }
    const indexFound = this.items.findIndex((i) => i.id === _id);
    this.items.splice(indexFound, 1);
    return true;
  }

  async activate(id: string): Promise<E> {
    const _id = `${id}`;
    const entity = await this._get(_id);
    if (!entity) {
      return;
    }
    entity.activate();
    return entity;
  }

  async inactivate(id: string): Promise<E> {
    const _id = `${id}`;
    const entity = await this._get(_id);
    if (!entity) {
      return;
    }
    entity.inactivate();
    return entity;
  }

  async softDelete(id: string): Promise<E> {
    const _id = `${id}`;
    const entity = await this._get(_id);
    if (!entity) {
      return;
    }
    entity.softDelete();
    return entity;
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    return item;
  }
}
