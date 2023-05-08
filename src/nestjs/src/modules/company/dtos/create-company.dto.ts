import { CommonStatus, CreateCompanyUseCase } from 'core';

export class CreateCompanyDto implements CreateCompanyUseCase.Input {
  name: string;

  status?: CommonStatus;

  /*propsdto*/
  lead_count: number;

  email: string;

  phone: string;

  document?: string;

  account_id: string;
}
