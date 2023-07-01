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
    'created_at',
  ];
  searchableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [];
  filterableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [
    'id',
    'status',
  ];
}
