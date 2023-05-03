import { Company } from '../entities';
import { CompanyInput } from '../../application';

export class CreateCompanyFactory {
  public static create(input: CompanyInput): Company {
    return new Company(input);
  }
}
