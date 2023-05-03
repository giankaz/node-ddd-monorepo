import { Importation, ImportationModel } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { IImportation } from '../../application';

export namespace ImportationRepositoryInterface {
  export type ImportationFields = {} & keyof IImportation;

  export type ImportationSearchParams = SearchProps<
    FilterParams<ImportationFields>,
    ImportationFields
  >;

  export class ImportationSearchResult extends SearchResult<
    ImportationModel,
    Importation,
    ImportationFields
  > {}

  export class ImportationSearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    ImportationModel,
    Importation
  > {}

  export type Repository = {} & RepositoryInterface<
    ImportationModel,
    Importation,
    ImportationFields
  >;
}
