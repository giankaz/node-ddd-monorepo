import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { IActivity } from '../../application';

export const ActivitySchema = new Schema<IActivity, Document>({
  ...BaseSchemaFields,
  data: { type: String, required: true },
  data_type: { type: String, required: true },
  account_id: { type: String, required: true },
  origin: { type: String, required: true },
  story_points: { type: Number, required: true },
  type: { type: String, required: true },
  lead_id: { type: String, required: true },
});
