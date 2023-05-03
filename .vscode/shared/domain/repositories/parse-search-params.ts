import { SearchParams } from './searchable.repository';

export interface ParseSearchParams {
  params: SearchParams;
  defaultSearch: object;
  sortableFields: string[];
  searchableFields: string[];
  filterableFields: string[];
}

export interface ParseSearchParamsInterface<Return> {
  parse(search: ParseSearchParams): Return;
}
