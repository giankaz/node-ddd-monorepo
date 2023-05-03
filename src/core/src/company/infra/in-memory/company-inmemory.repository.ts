import { InMemoryRepository } from '../../../shared';
import {
  Company,
  CompanyModel,
  CompanyRepositoryInterface,
} from '../../domain';

export class CompanyInMemoryRepository
  extends InMemoryRepository<
    CompanyModel,
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
}
