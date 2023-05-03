import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { ILead } from '../../application';

export const LeadSchema = new Schema<ILead, Document>({
  ...BaseSchemaFields,
  account_id: { type: String, required: true },
  document: { type: String, required: true },
  company_id: { type: String, required: true },
  email: { type: String, required: true },
  birth_date: { type: String, required: true },
  phone: { type: String, required: true },
  import_id: { type: String, required: false },
  story_points: { type: Number, required: true },
  origin: { type: String, required: false },
  is_opportunity: { type: Boolean, required: false },
  user_id: { type: String, required: false },
  state: { type: String, required: false },
});
