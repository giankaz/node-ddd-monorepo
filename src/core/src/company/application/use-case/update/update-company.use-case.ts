import { DefaultUseCase } from '../../../../shared';
import { CompanyRepositoryInterface } from '../../../domain';
import { ICompany, IPartialCompany } from '../../dto';

export namespace UpdateCompanyUseCase {
  export type Input = {
    id: string;
  } & IPartialCompany;

  export type Output = ICompany;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const entity = await this.companyRepository.findById(input.id);

      const notAllowedFields: Partial<keyof Input>[] = [
        'id',
        'created_at',
        'updated_at',
        'status',
      ];

      for (const key in input) {
        if (!notAllowedFields.includes(key as keyof Input)) {
          entity[key] = input[key];
        }
      }

      return await this.companyRepository.update(entity);
    }
  }
}
