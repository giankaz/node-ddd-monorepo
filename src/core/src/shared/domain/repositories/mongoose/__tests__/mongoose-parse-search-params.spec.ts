import {
  FilterParams,
  FilterTOperator,
  ParseSearchParams,
  SearchParams,
} from '../../../../domain';
import { MongooseParseSearchParams } from '../mongoose-parse-search-params';

describe('Test mongoose Parse search params', () => {
  it('should be successful if the operator is CONTAINS', () => {
    const filter = [
      {
        type: 'string',
        column: 'name',
        operator: FilterTOperator.CONTAINS,
        value: 'test',
      } as FilterParams,
    ];
    const parseParams = {
      params: new SearchParams({
        page: 1,
        per_page: 2,
        sort: 'created_at',
        sort_dir: 'asc',
        filter: filter,
        search: 'test',
      }),
      defaultSearch: [],
      defaultSearchOrExpressions: [],
      filterableFields: [],
      searchableFields: [],
      sortableFields: [],
    } as ParseSearchParams;

    const parseFilter = new MongooseParseSearchParams();
    expect(parseFilter.parse(parseParams)).toBeDefined();
  });

  it('should be successful if the type is Boolean', () => {
    const filter = [
      {
        type: 'boolean',
        column: 'name',
        operator: FilterTOperator.CONTAINS,
        value: 'test',
      } as FilterParams,
    ];
    const parseParams = {
      params: new SearchParams({
        page: 1,
        per_page: 2,
        sort: 'created_at',
        sort_dir: 'asc',
        filter: filter,
      }),
      defaultSearch: [],
      defaultSearchOrExpressions: [],
      filterableFields: [],
      searchableFields: [],
      sortableFields: [],
    } as ParseSearchParams;

    const parseFilter = new MongooseParseSearchParams();
    expect(parseFilter.parse(parseParams)).toBeDefined();
  });

  it('should be successful if the type is Date', () => {
    const filter = [
      {
        type: 'string',
        column: 'name',
        operator: FilterTOperator.CONTAINS,
        value: 'test',
      } as FilterParams,
    ];
    const parseParams = {
      params: new SearchParams({
        page: 1,
        per_page: 2,
        sort: 'created_at',
        filter: filter,
        search: 'test',
      }),
      defaultSearch: [],
      defaultSearchOrExpressions: [{ name: 'teste' }, { test: 'teste' }],
      filterableFields: ['name'],
      searchableFields: [],
      sortableFields: ['created_at'],
    } as ParseSearchParams;

    const parseFilter = new MongooseParseSearchParams();
    expect(parseFilter.parse(parseParams)).toBeDefined();
  });
});
