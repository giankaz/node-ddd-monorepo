import { SchemaDefinition } from 'mongoose';
import { CommonEntityValidator, CommonStatus } from '../../domain';

export type CommonEntityValidatorWithMongoId = {
  _id: string;
} & Omit<CommonEntityValidator, 'id'>;

export const BaseSchemaFields: SchemaDefinition<CommonEntityValidatorWithMongoId> =
  {
    _id: { type: String, alias: 'id' },
    status: {
      type: String,
      enum: CommonStatus,
    },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  };
