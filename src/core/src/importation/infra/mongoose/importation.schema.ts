import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { IImportation } from '../../application';

export const ImportationSchema = new Schema<IImportation, Document>({
  ...BaseSchemaFields,
  contact_total: { type: Number, required: true },
  account_id: { type: String, required: true },
  company_id: { type: String, required: true },
  emails_total: { type: Number, required: true },
});
