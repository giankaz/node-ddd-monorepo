import { ICompany } from './company.dto';

export type CompanyInput = Omit<ICompany, 'id'>;
