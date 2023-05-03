import { DefaultUseCase } from '../../../../shared';
import { CompanyRepositoryInterface } from '../../../domain';
import { ICompany } from '../../dto';

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

    public async useCase(input: Input): Promise<Output> {
      return (await this.companyRepository.findById(input.id)).toJSON();
    }
  }
}
