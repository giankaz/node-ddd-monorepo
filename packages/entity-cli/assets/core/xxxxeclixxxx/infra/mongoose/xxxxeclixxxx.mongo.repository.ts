import { Connection } from 'mongoose';
import { EntityClassMapping, MongooseRepository } from '../../../shared';
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
    'created_at',
  ];
  searchableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [];
  filterableFields: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields[] = [
    'id',
    'status',
  ];

  public entityClassMapping: EntityClassMapping[] = [];

  constructor(connection?: Connection) {
    super({
      collectionName: 'xxxxeclixxxxs',
      modelName: 'Xxxxeclixxxx',
      Schema: XxxxeclixxxxSchema,
      connection,
      subDocuments: [],
      populates: [],
    });
  }

  public toEntity(model: IXxxxeclixxxx): Xxxxeclixxxx {
    return new Xxxxeclixxxx(this.modelParser(model));
  }
}
