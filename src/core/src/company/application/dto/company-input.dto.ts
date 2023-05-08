import { CommonStatus } from '../../../shared';
import { ICompany } from './company.dto';

export type CompanyInput = {
  status?: CommonStatus;
} & Omit<ICompany, 'id' | 'created_at' | 'updated_at' | 'status'>;
