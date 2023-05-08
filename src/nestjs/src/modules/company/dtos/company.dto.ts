import { CommonStatus, ICompany } from 'core';

export class CompanyDto implements ICompany {
  id: string;

  name: string;

  status: CommonStatus;

  created_at: Date;

  updated_at: Date;

  /*propsdto*/
  lead_count: number;

  email: string;

  phone: string;

  document?: string;

  account_id: string;
}
