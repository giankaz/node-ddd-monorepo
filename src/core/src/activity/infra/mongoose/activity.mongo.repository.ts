import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import {
  Activity,
  ActivityModel,
  ActivityRepositoryInterface,
} from '../../domain';
import { ActivitySchema } from './activity.schema';
import { IActivity } from '../../application';

export class ActivityMongoRepository
  extends MongooseRepository<
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

  constructor(connection?: Connection) {
    super({
      collectionName: 'activitys',
      modelName: 'Activity',
      Schema: ActivitySchema,
      connection,
    });
  }

  public toEntity(model: IActivity): Activity {
    return new Activity({
      data: model.data,
      data_type: model.data_type,
      account_id: model.account_id,
      origin: model.origin,
      story_points: model.story_points,
      type: model.type,
      lead_id: model.lead_id,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
