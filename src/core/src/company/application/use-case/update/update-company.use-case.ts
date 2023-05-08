import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  CompanyNotFoundErrorFactory,
  CompanyRepositoryInterface,
} from '../../../domain';
import { ICompany, IPartialCompany } from '../../dto';

export namespace UpdateCompanyUseCase {
  export type Input = {
    id: string;
  } & Omit<IPartialCompany, 'id' | 'created_at' | 'updated_at'>;

  export type Output = ICompany;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Company Use Case';

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
        throw CompanyNotFoundErrorFactory.create(options?.language);
      }

      const notAllowedFields: Partial<keyof ICompany>[] = [
        'id',
        'status',
        'created_at',
        'updated_at',
      ];

      for (const key in input) {
        if (!notAllowedFields.includes(key as keyof Input)) {
          company[key] = input[key];
        }
      }

      return await this.companyRepository.update(company);
    }
  }
}
