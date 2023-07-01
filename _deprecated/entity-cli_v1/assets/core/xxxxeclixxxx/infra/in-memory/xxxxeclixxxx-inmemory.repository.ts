import { InMemoryRepository } from '../../../shared';
import { IXxxxeclixxxx } from '../../application';
import { Xxxxeclixxxx, XxxxeclixxxxRepositoryInterface } from '../../domain';

export class XxxxeclixxxxInMemoryRepository
  extends InMemoryRepository<
    IXxxxeclixxxx,
    Xxxxeclixxxx,
    XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields
  >
  implements XxxxeclixxxxRepositoryInterface.Repository
{
  sortableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [
    'name',
    'created_at',
  ];
  searchableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [
    'name',
  ];
  filterableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [
    'id',
    'name',
    'status',
  ];
}
