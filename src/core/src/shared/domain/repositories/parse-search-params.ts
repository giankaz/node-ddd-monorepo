import { SearchParams } from './searchable.repository';

export interface ParseSearchParams<Fields extends string> {
  params: SearchParams<Fields>;
  defaultSearch: object;
  sortableFields: Fields[];
  searchableFields: Fields[];
  filterableFields: Fields[];
}

export interface ParseSearchParamsInterface<Return> {
  parse<Fields extends string>(search: ParseSearchParams<Fields>): Return;
}
