import { Schema, Document } from 'mongoose';
import { BaseSchemaFields } from '../../../shared';
import { IReport } from '../../application';

export const ReportSchema = new Schema<IReport, Document>({
  ...BaseSchemaFields,
  customers: { type: Number, required: true },
  conversions: { type: Number, required: true },
  qualified_leads: { type: Number, required: true },
  opportunities: { type: Number, required: true },
  leads: { type: Number, required: true },
});
