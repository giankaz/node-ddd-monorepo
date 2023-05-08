import { InMemoryRepository } from '../../../shared';
import { ICompany } from '../../application';
import { Company, CompanyRepositoryInterface } from '../../domain';

export class CompanyInMemoryRepository
  extends InMemoryRepository<
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
}
