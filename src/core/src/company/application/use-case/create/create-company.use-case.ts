import { DefaultUseCase } from '../../../../shared';
import {
  CreateCompanyFactory,
  CompanyRepositoryInterface,
} from '../../../domain';
import { CompanyInput, ICompany } from '../../dto';

export namespace CreateCompanyUseCase {
  export type Input = CompanyInput;

  export type Output = ICompany;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const company = CreateCompanyFactory.create(input);

      return (await this.companyRepository.insert(company)).toJSON();
    }
  }
}
