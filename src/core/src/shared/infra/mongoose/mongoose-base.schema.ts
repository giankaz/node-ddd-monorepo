import { SchemaDefinition } from 'mongoose';

export const BaseSchemaFields: SchemaDefinition = {
  _id: { type: String, alias: 'id' },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
  },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: false },
};
