import { Entity, FilterParams, IFilterDateValue } from '../../domain';

export interface RepositoryInterface<Props, E extends Entity<Props>> {
  insert(entity: E): Promise<E>;
  insertMany(entities: E[]): Promise<E[]>;
  findById(id: string): Promise<E>;
  findByField(field: keyof Props, value: unknown): Promise<E>;
  findAll(): Promise<E[]>;
  search(props: SearchParams): Promise<SearchResult<Props, E>>;
  update(entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  activate(id: string): Promise<void>;
  inactivate(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchProps<FilterParams> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  search?: string; // search by name
  filter?: FilterParams[];
  defaultSearch?: object;
  defaultSearchOrExpressions?: object[];
};

export type SearchPropsWithoutPagination<FilterParams> = {
  filter: FilterParams[];
};

export class SearchParamsWithoutPagination {
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: FilterParams[] | null;
  protected _search: string | null;

  constructor(props?: SearchProps<FilterParams>) {
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

  get filter(): FilterParams[] | null {
    return this._filter;
  }

  private set filter(value: FilterParams[] | null) {
    this._filter = value;
  }

  get search(): string | null {
    return this._search;
  }

  set search(value: string | null) {
    this._search = value;
  }
}
export class SearchParams {
  protected _page: number;
  protected _per_page: number;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: FilterParams[] | null;
  protected _search: IFilterDateValue | string | boolean | number;
  protected _defaultSearch: object | null;
  protected _defaultSearchOrExpressions: object[] | null;

  constructor(props?: SearchProps<FilterParams>) {
    this._page = props?.page || 1;
    this._per_page = props?.per_page || 15;
    this._sort = props?.sort || null;
    this._sort_dir = props?.sort_dir || null;
    this._filter = props?.filter || null;
    this._search = props?.search || false;
    this._defaultSearch = props?.defaultSearch || null;
    this._defaultSearchOrExpressions =
      props?.defaultSearchOrExpressions || null;
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

  get filter(): FilterParams[] | null {
    return this._filter;
  }

  private set filter(value: FilterParams[] | null) {
    this._filter = value;
  }

  get search(): IFilterDateValue | string | boolean | number {
    return this._search;
  }

  set search(value: IFilterDateValue | string | boolean | number) {
    this._search = value;
  }
}

type SearchResultProps<Props, E extends Entity<Props>> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: FilterParams[] | null;
};

type SearchResultPropsWithoutPagination<E extends Entity<E>> = {
  items: E[];
};

export class SearchResult<Props, E extends Entity<Props>> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: FilterParams[] | null;

  constructor(props: SearchResultProps<Props, E>) {
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

export class SearchWithoutPaginationResult<E extends Entity<E>> {
  readonly items: E[];

  constructor(props: SearchResultPropsWithoutPagination<E>) {
    this.items = props.items;
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
    };
  }
}

export type SearchByIdAndUserIdInputDto = {
  id: string;
  account_id: string;
};
