import { DefaultUseCase } from '../../../../shared';
import { CompanyRepositoryInterface } from '../../../domain';

export namespace ActivateCompanyUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Activate Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.companyRepository.activate(input.id);
      return;
    }
  }
}
