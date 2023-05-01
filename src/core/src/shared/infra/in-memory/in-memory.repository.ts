import {
  Entity,
  NoEntityErrorStandardization,
  NotFoundError,
  UniqueEntityId,
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from '../../domain';

export abstract class InMemoryRepository<Props, E extends Entity<Props>>
  implements RepositoryInterface<Props, E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async insertMany(entities: E[]): Promise<void> {
    this.items = [...this.items, ...entities];
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex((i) => i.id === entity.id);
    this.items[indexFound] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex((i) => i.id === _id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(
        NoEntityErrorStandardization.not_found.ABSTRACT_ENTITY_NOT_FOUND,
      );
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<
    Props,
    E extends Entity<Props>,
  >
  extends InMemoryRepository<Props, E>
  implements SearchableRepositoryInterface<Props, E>
{
  abstract sortableFields: string[];
  abstract searchableFields: string[];
  abstract filterableFields: string[];

  async search(props: SearchParams): Promise<SearchResult<Props, E>> {
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

  protected abstract applyFilter(
    items: E[],
    filter: Omit<SearchParams, 'page' | 'per_page'> | null,
  ): Promise<E[]>;

  protected async applySort(
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
}
