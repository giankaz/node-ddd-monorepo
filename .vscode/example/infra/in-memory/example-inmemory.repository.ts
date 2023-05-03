import { InMemoryRepository } from '../../../shared';
import { Example, ExampleModel } from '../../domain';

export class ExampleInMemoryRepository extends InMemoryRepository<
  ExampleModel,
  Example
> {
  sortableFields: string[] = ['name', 'created_at'];
  searchableFields: string[] = ['name'];
  filterableFields: string[] = ['name'];
}
