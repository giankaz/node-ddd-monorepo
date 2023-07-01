import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import { Xxxxeclixxxx, XxxxeclixxxxRepositoryInterface } from '../../domain';
import { XxxxeclixxxxSchema } from './xxxxeclixxxx.schema';
import { IXxxxeclixxxx } from '../../application';

export class XxxxeclixxxxMongoRepository
  extends MongooseRepository<
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

  constructor(connection?: Connection) {
    super({
      collectionName: 'xxxxeclixxxxs',
      modelName: 'Xxxxeclixxxx',
      Schema: XxxxeclixxxxSchema,
      connection,
    });
  }

  public toEntity(model: IXxxxeclixxxx): Xxxxeclixxxx {
    return new Xxxxeclixxxx({
      /*toentityprops*/
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
