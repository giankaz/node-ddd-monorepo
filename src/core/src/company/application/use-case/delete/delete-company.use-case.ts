import { DefaultUseCase } from '../../../../shared';
import { CompanyRepositoryInterface } from '../../../domain';

export namespace DeleteCompanyUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Delete Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.companyRepository.delete(input.id);
      return;
    }
  }
}
