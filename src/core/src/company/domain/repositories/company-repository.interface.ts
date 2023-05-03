import { Company, CompanyModel } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { ICompany } from '../../application';

export namespace CompanyRepositoryInterface {
  export type CompanyFields = {} & keyof ICompany;

  export type CompanySearchParams = SearchProps<
    FilterParams<CompanyFields>,
    CompanyFields
  >;

  export class CompanySearchResult extends SearchResult<
    CompanyModel,
    Company,
    CompanyFields
  > {}

  export class CompanySearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    CompanyModel,
    Company
  > {}

  export type Repository = {} & RepositoryInterface<
    CompanyModel,
    Company,
    CompanyFields
  >;
}
