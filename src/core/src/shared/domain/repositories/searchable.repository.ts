import { Entity, FilterParams, IFilterDateValue } from '../../domain';

export interface RepositoryInterface<
  Model,
  E extends Entity<Model>,
  Fields extends string,
> {
  insert(entity: E): Promise<E>;
  insertMany(entities: E[]): Promise<E[]>;
  findById(id: string): Promise<E>;
  findByField(field: keyof Model, value: unknown): Promise<E>;
  findAll(): Promise<E[]>;
  search(props: SearchParams<Fields>): Promise<SearchResult<Model, E, Fields>>;
  update(entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  activate(id: string): Promise<void>;
  inactivate(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;

  sortableFields: Fields[];
  searchableFields: Fields[];
  filterableFields: Fields[];
}

export type SortDirection = 'asc' | 'desc';

export type SearchProps<FilterParams, Fields extends string> = {
  page?: number;
  per_page?: number;
  sort?: Fields | null;
  sort_dir?: SortDirection | null;
  search?: string; // search by name
  filter?: FilterParams[];
  defaultSearch?: object;
};

export type SearchPropsWithoutPagination<FilterParams> = {
  filter: FilterParams[];
};

export class SearchParamsWithoutPagination<Fields extends string> {
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: FilterParams<Fields>[] | null;
  protected _search: string | null;

  constructor(props?: SearchProps<FilterParams<Fields>, Fields>) {
    this._sort = props?.sort || null;
    this._sort_dir = props?.sort_dir || null;
    this._filter = props?.filter || null;
    this._search = props?.search || null;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): FilterParams<Fields>[] | null {
    return this._filter;
  }

  private set filter(value: FilterParams<Fields>[] | null) {
    this._filter = value;
  }

  get search(): string | null {
    return this._search;
  }

  set search(value: string | null) {
    this._search = value;
  }
}
export class SearchParams<Fields extends string> {
  protected _page: number;
  protected _per_page: number;
  protected _sort: Fields | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: FilterParams<Fields>[] | null;
  protected _search: IFilterDateValue | string | boolean | number;
  protected _defaultSearch: object | null;
  protected _defaultSearchOrExpressions: object[] | null;

  constructor(props?: SearchProps<FilterParams<Fields>, Fields>) {
    this._page = props?.page || 1;
    this._per_page = props?.per_page || 15;
    this._sort = props?.sort || null;
    this._sort_dir = props?.sort_dir || null;
    this._filter = props?.filter || null;
    this._search = props?.search || false;
    this._defaultSearch = props?.defaultSearch || null;
  }

  get defaultSearch(): object | null {
    return this._defaultSearch;
  }

  set defaultSearch(value: object | null) {
    this._defaultSearch = value;
  }

  get defaultSearchOrExpressions(): object[] | null {
    return this._defaultSearchOrExpressions;
  }

  set defaultSearchOrExpressions(value: object[] | null) {
    this._defaultSearchOrExpressions = value;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (
      Number.isNaN(_page) ||
      _page <= 0 ||
      parseInt(String(_page)) !== _page
    ) {
      _page = 1;
    }

    this._page = _page;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = !!value === true ? this._per_page : +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(String(_per_page)) !== _per_page
    ) {
      _per_page = this._per_page;
    }

    this._per_page = _per_page;
  }

  get sort(): Fields | null {
    return this._sort;
  }

  private set sort(value: Fields | null) {
    this._sort =
      value === null || value === undefined || value === ''
        ? null
        : (`${value}` as Fields);
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): FilterParams<Fields>[] | null {
    return this._filter;
  }

  private set filter(value: FilterParams<Fields>[] | null) {
    this._filter = value;
  }

  get search(): IFilterDateValue | string | boolean | number {
    return this._search;
  }

  set search(value: IFilterDateValue | string | boolean | number) {
    this._search = value;
  }
}

type SearchResultProps<
  Model,
  E extends Entity<Model>,
  Fields extends string,
> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: FilterParams<Fields>[] | null;
};

type SearchResultPropsWithoutPagination<Model, E extends Entity<Model>> = {
  items: E[];
};

export class SearchResult<
  Model,
  E extends Entity<Model>,
  Fields extends string,
> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: FilterParams<Fields>[] | null;

  constructor(props: SearchResultProps<Model, E, Fields>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter || null;
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
    };
  }
}

export class SearchWithoutPaginationResult<Model, E extends Entity<Model>> {
  readonly items: E[];

  constructor(props: SearchResultPropsWithoutPagination<Model, E>) {
    this.items = props.items;
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
    };
  }
}

export type PaginationOutputDto<Model, E extends Entity<Model>> = {
  items: E[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginationOutputMapper {
  static toOutput<Model, E extends Entity<Model>, Fields extends string>(
    items: E[],
    result: SearchResult<Model, E, Fields>,
  ): PaginationOutputDto<Model, E> {
    return {
      items,
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
