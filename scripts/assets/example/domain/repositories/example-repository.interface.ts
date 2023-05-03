import { Example, ExampleModel } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { IExample } from '../../application';

export namespace ExampleRepositoryInterface {
  export type ExampleFields = {} & keyof IExample;

  export type ExampleSearchParams = SearchProps<
    FilterParams<ExampleFields>,
    ExampleFields
  >;

  export class ExampleSearchResult extends SearchResult<
    ExampleModel,
    Example,
    ExampleFields
  > {}

  export class ExampleSearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    ExampleModel,
    Example
  > {}

  export type Repository = {} & RepositoryInterface<
    ExampleModel,
    Example,
    ExampleFields
  >;
}
