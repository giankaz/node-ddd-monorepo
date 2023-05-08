import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { ICompany } from '../../application';

export const CompanySchema = new Schema<ICompany, Document>({
  ...BaseSchemaFields,
  /*mongoschema*/
  lead_count: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  document: { type: String, required: false },
  account_id: { type: String, required: true },
});
