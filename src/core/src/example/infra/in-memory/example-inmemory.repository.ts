import { InMemoryRepository } from '../../../shared';
import {
  Example,
  ExampleModel,
  ExampleRepositoryInterface,
} from '../../domain';

export class ExampleInMemoryRepository
  extends InMemoryRepository<
    ExampleModel,
    Example,
    ExampleRepositoryInterface.ExampleFields
  >
  implements ExampleRepositoryInterface.Repository
{
  sortableFields: ExampleRepositoryInterface.ExampleFields[] = [
    'name',
    'created_at',
  ];
  searchableFields: ExampleRepositoryInterface.ExampleFields[] = ['name'];
  filterableFields: ExampleRepositoryInterface.ExampleFields[] = [
    'id',
    'name',
    'status',
  ];
}
