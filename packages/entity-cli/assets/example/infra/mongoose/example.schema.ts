import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { IExample } from '../../application';

export const ExampleSchema = new Schema<IExample, Document>({
  ...BaseSchemaFields,
  /*mongoschema*/
});
