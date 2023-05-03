import { Example, ExampleModel } from '..';
import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { IExample } from '../../application';

export namespace ExampleRepositoryInterface {
  export type ExampleFields = {} & keyof IExample;

  export class ExampleSearchParams extends SearchParams<ExampleFields> {}

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
