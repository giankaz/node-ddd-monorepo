import {
  CoreError,
  Entity,
  FilterInMemory,
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from '../../domain';

export abstract class InMemoryRepository<Model, E extends Entity<Model>>
  implements RepositoryInterface<Model, E>
{
  items: E[] = [];
  abstract sortableFields: string[];
  abstract searchableFields: string[];
  abstract filterableFields: string[];

  async search(props: SearchParams): Promise<SearchResult<Model, E>> {
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

  public async applyFilter(items: E[], filter: SearchParams): Promise<E[]> {
    if (!filter) {
      return items;
    }
    return FilterInMemory.parse<Model, E>(items, filter, {
      searchableFields: this.searchableFields,
      defaultSearch: [],
    });
  }

  public async applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a[sort] < b[sort]) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (a[sort] > b[sort]) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page'],
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

  async findByField(field: keyof Model, value: unknown): Promise<E> {
    return this.items.find((item) => item.toJSON()[field] === value);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<E> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex((i) => i.id === entity.id);
    this.items[indexFound] = entity;
    return entity;
  }

  async delete(id: string): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex((i) => i.id === _id);
    this.items.splice(indexFound, 1);
  }

  async activate(id: string): Promise<void> {
    const _id = `${id}`;
    const entity = await this._get(_id);
    entity.activate();
  }

  async inactivate(id: string): Promise<void> {
    const _id = `${id}`;
    const entity = await this._get(_id);
    entity.inactivate();
  }

  async softDelete(id: string): Promise<void> {
    const _id = `${id}`;
    const entity = await this._get(_id);
    entity.softDelete();
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new CoreError({
        message: 'item not found',
      });
    }
    return item;
  }
}
