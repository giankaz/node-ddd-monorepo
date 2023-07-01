import { Xxxxeclixxxx, XxxxeclixxxxValidator } from '..';
import {
  FilterParams,
  RepositoryInterface,
  SearchProps,
  SearchResult,
  SearchWithoutPaginationResult,
} from '../../../shared';
import { IXxxxeclixxxx } from '../../application';

export namespace XxxxeclixxxxRepositoryInterface {
  export type XxxxeclixxxxFields = {} & keyof IXxxxeclixxxx;

  export type XxxxeclixxxxSearchParams = SearchProps<
    FilterParams<XxxxeclixxxxFields>,
    XxxxeclixxxxFields
  >;

  export class XxxxeclixxxxSearchResult extends SearchResult<
    XxxxeclixxxxValidator,
    Xxxxeclixxxx,
    XxxxeclixxxxFields
  > {}

  export class XxxxeclixxxxSearchWithoutPaginationResult extends SearchWithoutPaginationResult<
    XxxxeclixxxxValidator,
    Xxxxeclixxxx
  > {}

  export type Repository = {} & RepositoryInterface<
    XxxxeclixxxxValidator,
    Xxxxeclixxxx,
    XxxxeclixxxxFields
  >;
}
