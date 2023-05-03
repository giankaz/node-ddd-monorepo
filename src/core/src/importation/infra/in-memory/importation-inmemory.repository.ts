import { InMemoryRepository } from '../../../shared';
import {
  Importation,
  ImportationModel,
  ImportationRepositoryInterface,
} from '../../domain';

export class ImportationInMemoryRepository
  extends InMemoryRepository<
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
}
