import { FilterParams, FilterOperators } from '../..';

import { Entity } from '../../entities';
import {
  ParseFilterInMemory,
  ParseFilterOperatorsInMemory,
} from './parse-filter-in-memory';
import { SearchParams } from '../repository.interface';

interface ApplyFilterDefaultSearch<Fields extends string> {
  defaultSearch: FilterParams<Fields>[];
  searchableFields: string[];
}

export class FilterInMemory {
  static parse<Props, E extends Entity<Props>, Fields extends string>(
    items: E[],
    filter: Omit<SearchParams<Fields>, 'page' | 'per_page'> | null,
    config: ApplyFilterDefaultSearch<Fields>,
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

    return results;
  }
}
