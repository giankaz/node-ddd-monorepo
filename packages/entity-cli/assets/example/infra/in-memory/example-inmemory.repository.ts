import { InMemoryRepository } from '../../../shared';
import {
  Example,
  ExampleValidator,
  ExampleRepositoryInterface,
} from '../../domain';

export class ExampleInMemoryRepository
  extends InMemoryRepository<
    ExampleValidator,
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
