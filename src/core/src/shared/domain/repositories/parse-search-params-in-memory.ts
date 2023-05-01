import { FilterParams, FilterOperators } from '../../domain';

import { Entity } from '../entities';
import {
  ParseFilterInMemory,
  ParseFilterOperatorsInMemory,
} from './parse-filter-in-memory';
import { SearchParams } from './searchable.repository';

interface ApplyFilterDefaultSearch {
  defaultSearch: FilterParams[];
  searchableFields: string[];
}

export class FilterInMemory {
  static parse<Props, E extends Entity<Props>>(
    items: E[],
    filter: Omit<SearchParams, 'page' | 'per_page'> | null,
    config: ApplyFilterDefaultSearch,
  ): E[] {
    const results: E[] = [];
    const filterParser = new ParseFilterInMemory();
    const filters: Function[] = [];

    if (filter?.filter) {
      filters.push(...filterParser.parseArray(filter.filter));
    }

    if (filter?.defaultSearch) {
      filters.push(...filterParser.parseArray(config.defaultSearch));
    }

    const searchOrFunctions = config.searchableFields.map((field) => {
      const result = [
        ParseFilterOperatorsInMemory.parseContains({
          column: field,
          type: 'string',
          value: filter?.search || '',
          operator:
            FilterOperators?.CONTAINS || ('CONTAINS' as FilterOperators),
        }),
        ...filters,
      ];

      return result;
    });

    searchOrFunctions.forEach((searchAndFunctions) => {
      const result = items.filter((item) => {
        return searchAndFunctions.every((fn) => {
          return !!fn(item);
        });
      });
      results.push(...result);
    });
    return results.filter(
      (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i,
    );
  }
}
