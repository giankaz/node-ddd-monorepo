import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { Example } from '../../domain';

export const ExampleSchema = new Schema<Example, Document>({
  ...BaseSchemaFields,
  value: { type: Number, required: true },
});
