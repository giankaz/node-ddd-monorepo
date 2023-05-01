import mongoose, { Connection, FilterQuery } from 'mongoose';
import {
  Entity,
  MongooseParseSearchParams,
  RepositoryInterface,
  SearchParams,
  SearchResult,
  UniqueEntityId,
} from '../../domain';

interface MongooseRepositoryConstructor<Props> {
  connection?: Connection;
  modelName: string;
  Schema: mongoose.Schema<Props>;
  collectionName: string;
}

export abstract class MongooseRepository<Props, E extends Entity<Props>>
  implements RepositoryInterface<Props, E>
{
  private model: mongoose.Model<Props>;

  abstract sortableFields: string[];
  abstract searchableFields: string[];
  abstract filterableFields: string[];

  constructor({
    collectionName,
    modelName,
    Schema,
    connection,
  }: MongooseRepositoryConstructor<Props>) {
    if (connection) {
      this.model = connection.model<Props>(modelName, Schema, collectionName);
    } else {
      this.model = mongoose.model<Props>(modelName, Schema, collectionName);
    }
  }

  abstract toEntity(model: Props): E;

  async insert(entity: E): Promise<E> {
    const model = new this.model({ ...entity.toJSON() });

    await model.save();

    return this.toEntity(model);
  }

  async insertMany(entities: E[]): Promise<E[]> {
    const jsonEntities = entities.map((entity) => entity.toJSON());
    const models = await this.model.insertMany(jsonEntities);
    return models.map(this.toEntity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const model = await this.model.findOne({ _id: String(id) }).exec();

    return this.toEntity(model);
  }

  async findByField(field: keyof Props, value: unknown): Promise<E> {
    const model = await this.model.findOne({
      [field]: value,
    } as FilterQuery<Props>);

    return this.toEntity(model);
  }

  async findAll(): Promise<E[]> {
    return (await this.model.find()).map(this.toEntity);
  }

  public async search(props: SearchParams): Promise<SearchResult<Props, E>> {
    const parsedParams = new MongooseParseSearchParams().parse({
      params: props,
      filterableFields: this.filterableFields,
      sortableFields: this.sortableFields,
      searchableFields: this.searchableFields,
      defaultSearch: props?.defaultSearch ? props.defaultSearch : [],
    });

    const total = await this.model.countDocuments(parsedParams.find).exec();

    const templates = await this.model
      .find(parsedParams.find)
      .sort(parsedParams.sort)
      .skip(parsedParams.skip)
      .limit(parsedParams.limit)
      .exec();

    const templatesEntities = templates.map((template) =>
      this.toEntity(template),
    );

    return new SearchResult({
      items: templatesEntities,
      total: total,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  async update(entity: E): Promise<E> {
    const model = await this.model.findOneAndUpdate(
      { _id: String(entity.id) },
      entity.toJSON(),
    );

    return this.toEntity(model);
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.model.findOneAndDelete({ _id: String(id) });
  }

  async activate(id: string): Promise<void> {
    const entity = await this.findById(id);

    entity.activate();

    await this.update(entity);
  }

  async inactivate(id: string): Promise<void> {
    const entity = await this.findById(id);

    entity.inactivate();

    await this.update(entity);
  }

  async softDelete(id: string): Promise<void> {
    const entity = await this.findById(id);

    entity.softDelete();

    await this.update(entity);
  }
}
