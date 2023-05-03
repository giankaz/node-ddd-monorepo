import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import { Report, ReportModel, ReportRepositoryInterface } from '../../domain';
import { ReportSchema } from './report.schema';
import { IReport } from '../../application';

export class ReportMongoRepository
  extends MongooseRepository<
    ReportModel,
    Report,
    ReportRepositoryInterface.ReportFields
  >
  implements ReportRepositoryInterface.Repository
{
  sortableFields: ReportRepositoryInterface.ReportFields[] = [
    'name',
    'created_at',
  ];
  searchableFields: ReportRepositoryInterface.ReportFields[] = ['name'];
  filterableFields: ReportRepositoryInterface.ReportFields[] = [
    'id',
    'name',
    'status',
  ];

  constructor(connection?: Connection) {
    super({
      collectionName: 'reports',
      modelName: 'Report',
      Schema: ReportSchema,
      connection,
    });
  }

  public toEntity(model: IReport): Report {
    return new Report({
      customers: model.customers,
      conversions: model.conversions,
      qualified_leads: model.qualified_leads,
      opportunities: model.opportunities,
      leads: model.leads,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
