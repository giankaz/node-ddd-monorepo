import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import {
  Example,
  ExampleValidator,
  ExampleRepositoryInterface,
} from '../../domain';
import { ExampleSchema } from './example.schema';
import { IExample } from '../../application';

export class ExampleMongoRepository
  extends MongooseRepository<
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

  constructor(connection?: Connection) {
    super({
      collectionName: 'examples',
      modelName: 'Example',
      Schema: ExampleSchema,
      connection,
    });
  }

  public toEntity(model: IExample): Example {
    return new Example({
      /*toentityprops*/
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
