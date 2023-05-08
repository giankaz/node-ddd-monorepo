import { CompanyValidator } from '../../domain';

export type ICompany = Pick<CompanyValidator, keyof CompanyValidator>;
