import { Report, ReportModel } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { IReport } from '../../application';

export namespace ReportRepositoryInterface {
  export type ReportFields = {} & keyof IReport;

  export type ReportSearchParams = SearchProps<
    FilterParams<ReportFields>,
    ReportFields
  >;

  export class ReportSearchResult extends SearchResult<
    ReportModel,
    Report,
    ReportFields
  > {}

  export class ReportSearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    ReportModel,
    Report
  > {}

  export type Repository = {} & RepositoryInterface<
    ReportModel,
    Report,
    ReportFields
  >;
}
