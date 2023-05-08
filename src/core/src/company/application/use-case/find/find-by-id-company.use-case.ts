import { translate } from 'translation';
import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import { CompanyRepositoryInterface } from '../../../domain';
import { ICompany } from '../../dto';
import { CompanyNotFoundErrorFactory } from '../../../domain/errors';

export namespace FindByIdCompanyUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ICompany;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const company = await this.companyRepository.findById(input.id);

      if (!company) {
        throw CompanyNotFoundErrorFactory.create(options.language);
      }

      return company.toJSON();
    }
  }
}
