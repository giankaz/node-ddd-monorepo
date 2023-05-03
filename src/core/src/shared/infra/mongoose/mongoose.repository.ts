import mongoose, { Connection, FilterQuery, Document } from 'mongoose';
import {
  CommonStatus,
  Entity,
  MongooseParseSearchParams,
  RepositoryInterface,
  SearchParams,
  SearchResult,
} from '../../domain';

interface MongooseRepositoryConstructor<Model> {
  connection?: Connection;
  modelName: string;
  Schema: mongoose.Schema<Model, Document>;
  collectionName: string;
}

export abstract class MongooseRepository<
  Model,
  E extends Entity<Model>,
  Fields extends string,
> implements RepositoryInterface<Model, E, Fields>
{
  private model: mongoose.Model<Model>;

  abstract sortableFields: Fields[];
  abstract searchableFields: Fields[];
  abstract filterableFields: Fields[];

  constructor({
    collectionName,
    modelName,
    Schema,
    connection,
  }: MongooseRepositoryConstructor<Model>) {
    if (connection) {
      this.model = connection.model<Model>(modelName, Schema, collectionName);
    } else {
      this.model = mongoose.model<Model>(modelName, Schema, collectionName);
    }
  }

  abstract toEntity(model: Model): E;

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

  async findById(id: string): Promise<E> {
    const model = await this.model.findOne({ _id: String(id) }).exec();

    return this.toEntity(model);
  }

  async findByField(field: keyof Model, value: unknown): Promise<E> {
    const model = await this.model.findOne({
      [field]: value,
    } as FilterQuery<Model>);

    return this.toEntity(model);
  }

  async findAll(): Promise<E[]> {
    return (await this.model.find()).map(this.toEntity);
  }

  public async search(
    props: SearchParams<Fields>,
  ): Promise<SearchResult<Model, E, Fields>> {
    const parsedParams = new MongooseParseSearchParams().parse<Fields>({
      params: props,
      filterableFields: this.filterableFields,
      sortableFields: this.sortableFields,
      searchableFields: this.searchableFields,
      defaultSearch: props?.defaultSearch ? props.defaultSearch : [],
    });

    const total = await this.model.countDocuments(parsedParams.find).exec();

    const models = await this.model
      .find(parsedParams.find)
      .sort(parsedParams.sort)
      .skip(parsedParams.skip)
      .limit(parsedParams.limit)
      .exec();

    const entities = models.map(this.toEntity);

    return new SearchResult({
      items: entities,
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

  async delete(id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id: String(id) });
  }

  async activate(id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { status: CommonStatus.ACTIVE });
  }

  async inactivate(id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { status: CommonStatus.INACTIVE });
  }

  async softDelete(id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { status: CommonStatus.DELETED });
  }
}
