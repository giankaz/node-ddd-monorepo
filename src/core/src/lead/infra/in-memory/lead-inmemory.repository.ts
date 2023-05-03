import { InMemoryRepository } from '../../../shared';
import { Lead, LeadModel, LeadRepositoryInterface } from '../../domain';

export class LeadInMemoryRepository
  extends InMemoryRepository<
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
}
