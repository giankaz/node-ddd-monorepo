import { Connection } from 'mongoose';
import { MongooseRepository } from '../../../shared';
import {
  Example,
  ExampleModel,
  ExampleRepositoryInterface,
  IExample,
} from '../../domain';
import { ExampleSchema } from './example.schema';

type Fields = {} & Partial<keyof IExample>;

export class ExampleMongoRepository
  extends MongooseRepository<ExampleModel, Example>
  implements ExampleRepositoryInterface.Repository
{
  sortableFields: Fields[] = ['name', 'created_at'];
  searchableFields: Fields[] = ['name'];
  filterableFields: Fields[] = ['id', 'name'];

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
      value: model.value,
      id: model.id,
      created_at: model.created_at,
      name: model.name,
      status: model.status,
      updated_at: model.updated_at,
    });
  }
}
