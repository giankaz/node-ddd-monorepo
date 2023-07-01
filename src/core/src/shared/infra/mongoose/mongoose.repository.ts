/* eslint-disable no-extra-boolean-cast */
import mongoose, {
  Connection,
  FilterQuery,
  Document,
  PopulateOptions,
} from 'mongoose';
import {
  CommonStatus,
  Entity,
  MongooseParseSearchParams,
  RepositoryInterface,
  SearchParams,
  SearchResult,
} from '../../domain';

export interface EntityClassMapping {
  key: string;
  classConstructor: { new (props: unknown): unknown };
  schema: { obj: object };
  isArray?: boolean;
  isOptional?: boolean;
}

interface MongooseRepositoryConstructor<Props> {
  connection?: Connection;
  modelName: string;
  Schema: mongoose.Schema<Props, Document>;
  collectionName: string;
  subDocuments?: (
    | Partial<keyof Props>
    | { doc: Partial<keyof Props>; isArray?: boolean; isOptional?: boolean }
  )[];
  populates?: PopulateOptions[];
}

export abstract class MongooseRepository<
  Props,
  E extends Entity<Props>,
  Fields extends string,
> implements RepositoryInterface<Props, E, Fields>
{
  public model: mongoose.Model<Props>;
  private subDocuments: string[] | { doc: string; isArray?: boolean }[];
  public populates: PopulateOptions[];
  private schema: { obj: object };

  abstract sortableFields: Fields[];
  abstract searchableFields: Fields[];
  abstract filterableFields: Fields[];

  public entityClassMapping: EntityClassMapping[] = [];

  constructor({
    collectionName,
    modelName,
    Schema,
    connection,
    subDocuments,
    populates,
  }: MongooseRepositoryConstructor<Props>) {
    if (connection) {
      this.model = connection.model<Props>(modelName, Schema, collectionName);
    } else {
      this.model = mongoose.model<Props>(modelName, Schema, collectionName);
    }

    if (subDocuments) {
      this.subDocuments = subDocuments as string[];
    }

    if (populates) {
      this.populates = populates;
    }

    this.schema = Schema;
  }
  abstract toEntity(model: Props): E;

  public modelParser<E>(model: object, schema?: { obj: object }): E {
    const entity = {} as E;
    schema = schema || this.schema;

    if (model) {
      if (model['_id'] && !model['id']) {
        model['id'] = model['_id'];
      }
    }

    Reflect.deleteProperty(schema?.obj, '_id');

    const schemaKeys = [...Object.keys(schema?.obj), 'id'];

    for (const key in model) {
      if (schemaKeys.includes(key)) {
        const value = model[key];
        const classMapping = this.entityClassMapping.find(
          (mapping) => mapping.key === key,
        );

        if (classMapping?.isOptional && !value) {
          continue;
        }

        if (classMapping) {
          if (classMapping?.isArray) {
            const parsedArray = value.map(
              (element) =>
                new classMapping.classConstructor(
                  this.modelParser(element, classMapping.schema),
                ),
            );
            entity[key] = parsedArray;
          } else {
            entity[key] = new classMapping.classConstructor(
              this.modelParser(value, classMapping.schema),
            );
          }
        } else {
          entity[key] = value;
        }
      }
    }

    return entity;
  }

  async insert(entity: E): Promise<E> {
    let result = { ...entity.toJSON() };

    if (!!this.subDocuments) {
      for (const subDoc of this.subDocuments) {
        result = this.subDocEntityToId(
          subDoc as string,
          result as ReturnType<E['toJSON']>,
          entity,
        );
      }
    }
    const model = new this.model(result);

    await model.save();

    if (!!this.populates) {
      await model.populate(this.populates);
    }

    return this.toEntity(model);
  }

  async insertMany(entities: E[]): Promise<E[]> {
    const jsonEntities = entities.map((entity) => {
      let result = { ...entity.toJSON() };

      if (!!this.subDocuments) {
        for (const subDoc of this.subDocuments) {
          result = this.subDocEntityToId(
            subDoc as string,
            result as ReturnType<E['toJSON']>,
            entity,
          );
        }
      }
      return result;
    });

    await this.model.insertMany(jsonEntities, {
      lean: true,
      rawResult: true,
      ordered: false,
    });

    return entities;
  }

  async findById(id: string): Promise<E> {
    const query = this.model
      .findOne({ _id: String(id) })
      .lean<Props>({ versionKey: false });

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const model = await query.exec();

    if (!model) return;

    return this.toEntity(model);
  }

  async findByField(field: keyof Props, value: unknown): Promise<E> {
    if (field === 'id') {
      field = '_id' as keyof Props;
    }

    const query = this.model.findOne({
      [field]: value,
    } as FilterQuery<Props>);

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const model = await query.exec();

    if (!model) return;

    return this.toEntity(model);
  }

  async findAll(): Promise<E[]> {
    const query = this.model.find().lean<Props>();

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const models = (await query.exec()) as Props[];

    return models.map((model) => this.toEntity(model));
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
    const query = this.model
      .find(parsedParams.find)
      .lean<Props>({ versionKey: false })
      .sort(parsedParams.sort)
      .skip(parsedParams.skip)
      .limit(parsedParams.limit);

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const models = (await query.exec()) as Props[];

    const entities = models.map((model) => this.toEntity(model));

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
    let result = { ...entity.toJSON() };

    if (!!this.subDocuments) {
      for (const subDoc of this.subDocuments) {
        result = this.subDocEntityToId(
          subDoc as string,
          result as ReturnType<E['toJSON']>,
          entity,
        );
      }
    }

    const query = this.model.findOneAndUpdate(
      { _id: String(entity.id) },
      result,
      { new: true },
    );

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const model = await query.exec();

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
    const query = this.model
      .findOneAndUpdate(
        { _id: String(id) },
        {
          status: CommonStatus.ACTIVE,
        },
        { new: true },
      )
      .lean<Props>();

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const result = await query.exec();

    if (!result) return;
    return this.toEntity(result);
  }

  async deactivate(id: string): Promise<E> {
    const query = this.model
      .findOneAndUpdate(
        { _id: String(id) },
        {
          status: CommonStatus.INACTIVE,
        },
        { new: true },
      )
      .lean<Props>();

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const result = await query.exec();

    if (!result) return;
    return this.toEntity(result);
  }

  async softDelete(id: string): Promise<E> {
    const query = this.model
      .findOneAndUpdate(
        { _id: String(id) },
        {
          status: CommonStatus.DELETED,
        },
        { new: true },
      )
      .lean<Props>();
    if (!!this.populates) {
      query.populate(this.populates);
    }

    const result = await query.exec();

    if (!result) return;
    return this.toEntity(result);
  }

  async countDocuments(): Promise<number> {
    return await this.model.countDocuments().exec();
  }

  async getLatest(): Promise<E> {
    const latest = await this.model
      .findOne()
      .lean<Props>()
      .sort({ _id: -1 })
      .exec();

    if (!latest) return;

    return this.toEntity(latest);
  }

  async searchWithoutPagination(props: SearchParams<Fields>): Promise<E[]> {
    const parsedParams = new MongooseParseSearchParams().parse<Fields>({
      params: props,
      filterableFields: this.filterableFields,
      sortableFields: this.sortableFields,
      searchableFields: this.searchableFields,
      defaultSearch: props?.defaultSearch ? props.defaultSearch : [],
    });

    const query = this.model
      .find(parsedParams.find)
      .lean<Props>({ versionKey: false });

    if (!!this.populates) {
      query.populate(this.populates);
    }

    const models = (await query.exec()) as Props[];

    const entities = models.map((model) => this.toEntity(model));

    return entities;
  }

  private subDocEntityToId(
    subDoc:
      | string
      | { doc: Partial<keyof Props>; isArray?: boolean; isOptional?: boolean },
    result: ReturnType<E['toJSON']>,
    entity: E,
  ) {
    if (typeof subDoc === 'string') {
      result[subDoc] = entity[subDoc].id;
    } else {
      if (subDoc?.isArray) {
        const arr = [];
        for (const item of entity[subDoc.doc as string]) {
          arr.push(item.id);
        }
        result[subDoc.doc as string] = arr;
      } else if (subDoc?.isOptional && !entity[subDoc.doc as string]?.id) {
        return result;
      } else {
        result[subDoc.doc] = entity[subDoc.doc as string]?.id;
      }
    }
    return result;
  }
}
