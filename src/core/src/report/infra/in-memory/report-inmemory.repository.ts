import { InMemoryRepository } from '../../../shared';
import { Report, ReportModel, ReportRepositoryInterface } from '../../domain';

export class ReportInMemoryRepository
  extends InMemoryRepository<
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
}
