import mongoose, { Connection, FilterQuery, Document } from 'mongoose';
import {
  CommonStatus,
  Entity,
  MongooseParseSearchParams,
  RepositoryInterface,
  SearchParams,
  SearchResult,
} from '../../domain';

interface MongooseRepositoryConstructor<Props> {
  connection?: Connection;
  modelName: string;
  Schema: mongoose.Schema<Props, Document>;
  collectionName: string;
}

export abstract class MongooseRepository<
  Props,
  E extends Entity<Props>,
  Fields extends string,
> implements RepositoryInterface<Props, E, Fields>
{
  private model: mongoose.Model<Props>;

  abstract sortableFields: Fields[];
  abstract searchableFields: Fields[];
  abstract filterableFields: Fields[];

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

  async findById(id: string): Promise<E> {
    const model = await this.model.findOne({ _id: String(id) }).exec();

    if (!model) return;

    return this.toEntity(model);
  }

  async findByField(field: keyof Props, value: unknown): Promise<E> {
    const model = await this.model.findOne({
      [field]: value,
    } as FilterQuery<Props>);

    if (!model) return;

    return this.toEntity(model);
  }

  async findAll(): Promise<E[]> {
    return (await this.model.find()).map(this.toEntity);
  }

  public async search(
    props: SearchParams<Fields>,
  ): Promise<SearchResult<Props, E, Fields>> {
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
      { new: true },
    );

    if (!model) return;

    return this.toEntity(model);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findOneAndDelete({ _id: String(id) });
    if (!result) {
      return;
    }
    return true;
  }

  async activate(id: string): Promise<E> {
    const result = await this.model.findOneAndUpdate(
      { _id: String(id) },
      {
        status: CommonStatus.ACTIVE,
      },
      { new: true },
    );
    if (!result) return;
    return this.toEntity(result);
  }

  async inactivate(id: string): Promise<E> {
    const result = await this.model.findOneAndUpdate(
      { _id: String(id) },
      {
        status: CommonStatus.INACTIVE,
      },
      { new: true },
    );
    if (!result) return;
    return this.toEntity(result);
  }

  async softDelete(id: string): Promise<E> {
    const result = await this.model.findOneAndUpdate(
      { _id: String(id) },
      {
        status: CommonStatus.DELETED,
      },
      { new: true },
    );
    if (!result) return;
    return this.toEntity(result);
  }
}
