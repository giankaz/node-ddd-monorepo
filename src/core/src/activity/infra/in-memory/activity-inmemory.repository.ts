import { InMemoryRepository } from '../../../shared';
import {
  Activity,
  ActivityModel,
  ActivityRepositoryInterface,
} from '../../domain';

export class ActivityInMemoryRepository
  extends InMemoryRepository<
    ActivityModel,
    Activity,
    ActivityRepositoryInterface.ActivityFields
  >
  implements ActivityRepositoryInterface.Repository
{
  sortableFields: ActivityRepositoryInterface.ActivityFields[] = [
    'name',
    'created_at',
  ];
  searchableFields: ActivityRepositoryInterface.ActivityFields[] = ['name'];
  filterableFields: ActivityRepositoryInterface.ActivityFields[] = [
    'id',
    'name',
    'status',
  ];
}
