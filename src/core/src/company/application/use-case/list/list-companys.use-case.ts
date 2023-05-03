import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
} from '../../../../shared';
import {
  Company,
  CompanyModel,
  CompanyRepositoryInterface,
} from '../../../domain';

export namespace ListCompanysUseCase {
  export type Input = {
    params: CompanyRepositoryInterface.CompanySearchParams;
  };

  export type Output = PaginationOutputDto<CompanyModel, Company>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Company Use Case';

    constructor(
      private readonly companyRepository: CompanyRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const params = new SearchParams<CompanyRepositoryInterface.CompanyFields>(
        { ...input.params },
      );

      const searchResult = await this.companyRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: CompanyRepositoryInterface.CompanySearchResult,
    ): Output {
      const entities = searchResult
        .toJSON()
        .items.map((company) => company.toJSON());

      return PaginationOutputMapper.toOutput<
        CompanyModel,
        Company,
        CompanyRepositoryInterface.CompanyFields
      >(entities, searchResult);
    }
  }
}
