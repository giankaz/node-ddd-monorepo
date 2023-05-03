import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import {
  Importation,
  ImportationModel,
  ImportationRepositoryInterface,
} from '../../domain';
import { ImportationSchema } from './importation.schema';
import { IImportation } from '../../application';

export class ImportationMongoRepository
  extends MongooseRepository<
    ImportationModel,
    Importation,
    ImportationRepositoryInterface.ImportationFields
  >
  implements ImportationRepositoryInterface.Repository
{
  sortableFields: ImportationRepositoryInterface.ImportationFields[] = [
    'name',
    'created_at',
  ];
  searchableFields: ImportationRepositoryInterface.ImportationFields[] = [
    'name',
  ];
  filterableFields: ImportationRepositoryInterface.ImportationFields[] = [
    'id',
    'name',
    'status',
  ];

  constructor(connection?: Connection) {
    super({
      collectionName: 'importations',
      modelName: 'Importation',
      Schema: ImportationSchema,
      connection,
    });
  }

  public toEntity(model: IImportation): Importation {
    return new Importation({
      contact_total: model.contact_total,
      account_id: model.account_id,
      company_id: model.company_id,
      emails_total: model.emails_total,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
