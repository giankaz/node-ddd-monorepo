import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  CompanyNotFoundErrorFactory,
  CompanyRepositoryInterface,
} from '../../../domain';

export namespace DeleteCompanyUseCase {
  export type Input = {
    id: string;
  };

  export type Output = boolean;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Delete Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const result = await this.companyRepository.delete(input.id);

      if (result === undefined) {
        throw CompanyNotFoundErrorFactory.create(options.language);
      }

      return result;
    }
  }
}
