import { CompanyModel } from '../../domain';

export type ICompany = Pick<CompanyModel, keyof CompanyModel>;
