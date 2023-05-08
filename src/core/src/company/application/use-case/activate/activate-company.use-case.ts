import { DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  CompanyNotFoundErrorFactory,
  CompanyRepositoryInterface,
} from '../../../domain';
import { ICompany } from '../../dto';

export namespace ActivateCompanyUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ICompany;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Activate Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const company = await this.companyRepository.activate(input.id);

      if (!company) {
        throw CompanyNotFoundErrorFactory.create(options.language);
      }

      return company.toJSON();
    }
  }
}
