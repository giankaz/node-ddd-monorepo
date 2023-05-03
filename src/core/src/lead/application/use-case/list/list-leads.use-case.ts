import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
} from '../../../../shared';
import { Lead, LeadModel, LeadRepositoryInterface } from '../../../domain';

export namespace ListLeadsUseCase {
  export type Input = {
    params: LeadRepositoryInterface.LeadSearchParams;
  };

  export type Output = PaginationOutputDto<LeadModel, Lead>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Lead Use Case';

    constructor(
      private readonly leadRepository: LeadRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const params = new SearchParams<LeadRepositoryInterface.LeadFields>({
        ...input.params,
      });

      const searchResult = await this.leadRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: LeadRepositoryInterface.LeadSearchResult,
    ): Output {
      const entities = searchResult.toJSON().items.map((lead) => lead.toJSON());

      return PaginationOutputMapper.toOutput<
        LeadModel,
        Lead,
        LeadRepositoryInterface.LeadFields
      >(entities, searchResult);
    }
  }
}
