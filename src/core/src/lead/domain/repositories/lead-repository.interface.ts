import { Lead, LeadModel } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { ILead } from '../../application';

export namespace LeadRepositoryInterface {
  export type LeadFields = {} & keyof ILead;

  export type LeadSearchParams = SearchProps<
    FilterParams<LeadFields>,
    LeadFields
  >;

  export class LeadSearchResult extends SearchResult<
    LeadModel,
    Lead,
    LeadFields
  > {}

  export class LeadSearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    LeadModel,
    Lead
  > {}

  export type Repository = {} & RepositoryInterface<
    LeadModel,
    Lead,
    LeadFields
  >;
}
