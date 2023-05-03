import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import { Lead, LeadModel, LeadRepositoryInterface } from '../../domain';
import { LeadSchema } from './lead.schema';
import { ILead } from '../../application';

export class LeadMongoRepository
  extends MongooseRepository<
    LeadModel,
    Lead,
    LeadRepositoryInterface.LeadFields
  >
  implements LeadRepositoryInterface.Repository
{
  sortableFields: LeadRepositoryInterface.LeadFields[] = ['name', 'created_at'];
  searchableFields: LeadRepositoryInterface.LeadFields[] = ['name'];
  filterableFields: LeadRepositoryInterface.LeadFields[] = [
    'id',
    'name',
    'status',
  ];

  constructor(connection?: Connection) {
    super({
      collectionName: 'leads',
      modelName: 'Lead',
      Schema: LeadSchema,
      connection,
    });
  }

  public toEntity(model: ILead): Lead {
    return new Lead({
      account_id: model.account_id,
      document: model.document,
      company_id: model.company_id,
      email: model.email,
      birth_date: model.birth_date,
      phone: model.phone,
      import_id: model.import_id,
      story_points: model.story_points,
      origin: model.origin,
      is_opportunity: model.is_opportunity,
      user_id: model.user_id,
      state: model.state,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
