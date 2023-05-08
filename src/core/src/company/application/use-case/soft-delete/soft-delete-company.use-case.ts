import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  CompanyNotFoundErrorFactory,
  CompanyRepositoryInterface,
} from '../../../domain';
import { ICompany } from '../../dto';

export namespace SoftDeleteCompanyUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ICompany;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Soft Delete Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const company = await this.companyRepository.softDelete(input.id);

      if (!company) {
        throw CompanyNotFoundErrorFactory.create(options?.language);
      }

      return company.toJSON();
    }
  }
}
