import { SchemaDefinition } from 'mongoose';
import { CommonEntityModel } from '../../domain';

export type CommonEntityModelWithMongoId = {
  _id: string;
} & Omit<CommonEntityModel, 'id'>;

export const BaseSchemaFields: SchemaDefinition<CommonEntityModelWithMongoId> =
  {
    _id: { type: String, alias: 'id' },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  };
