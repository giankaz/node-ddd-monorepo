import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';

import { Example, ExampleModel } from '../../domain';

export namespace ExampleRepositoryInterface {
  export class ExampleSearchParams extends SearchParams {}

  export class ExampleSearchResult extends SearchResult<
    ExampleModel,
    Example
  > {}

  export class ExampleSearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    ExampleModel,
    Example
  > {}

  export type Repository = {} & RepositoryInterface<ExampleModel, Example>;
}
