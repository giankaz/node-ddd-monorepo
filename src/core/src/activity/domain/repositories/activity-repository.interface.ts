import { Activity, ActivityModel } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { IActivity } from '../../application';

export namespace ActivityRepositoryInterface {
  export type ActivityFields = {} & keyof IActivity;

  export type ActivitySearchParams = SearchProps<
    FilterParams<ActivityFields>,
    ActivityFields
  >;

  export class ActivitySearchResult extends SearchResult<
    ActivityModel,
    Activity,
    ActivityFields
  > {}

  export class ActivitySearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    ActivityModel,
    Activity
  > {}

  export type Repository = {} & RepositoryInterface<
    ActivityModel,
    Activity,
    ActivityFields
  >;
}
