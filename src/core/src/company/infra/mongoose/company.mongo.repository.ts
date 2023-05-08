import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import { Company, CompanyRepositoryInterface } from '../../domain';
import { CompanySchema } from './company.schema';
import { ICompany } from '../../application';

export class CompanyMongoRepository
  extends MongooseRepository<
    ICompany,
    Company,
    CompanyRepositoryInterface.CompanyFields
  >
  implements CompanyRepositoryInterface.Repository
{
  sortableFields: CompanyRepositoryInterface.CompanyFields[] = [
    'name',
    'created_at',
  ];
  searchableFields: CompanyRepositoryInterface.CompanyFields[] = ['name'];
  filterableFields: CompanyRepositoryInterface.CompanyFields[] = [
    'id',
    'name',
    'status',
  ];

  constructor(connection?: Connection) {
    super({
      collectionName: 'companys',
      modelName: 'Company',
      Schema: CompanySchema,
      connection,
    });
  }

  public toEntity(model: ICompany): Company {
    return new Company({
      /*toentityprops*/
      account_id: model.account_id,
      document: model.document,
      phone: model.phone,
      email: model.email,
      lead_count: model.lead_count,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
