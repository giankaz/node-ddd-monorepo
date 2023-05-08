import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
  UseCaseOptions,
} from '../../../../shared';
import { Company, CompanyRepositoryInterface } from '../../../domain';
import { ICompany } from '../../dto';

export namespace ListCompanysUseCase {
  export type Input = {
    params: CompanyRepositoryInterface.CompanySearchParams;
  };

  export type Output = PaginationOutputDto<ICompany>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'List Companys Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const params = new SearchParams<CompanyRepositoryInterface.CompanyFields>(
        input.params,
      );

      const searchResult = await this.companyRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: CompanyRepositoryInterface.CompanySearchResult,
    ): Output {
      const entities = searchResult.items.map((company) => company.toJSON());

      return PaginationOutputMapper.toOutput<
        ICompany,
        Company,
        CompanyRepositoryInterface.CompanyFields
      >(entities, searchResult);
    }
  }
}
