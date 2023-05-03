import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
} from '../../../../shared';
import {
  Example,
  ExampleModel,
  ExampleRepositoryInterface,
} from '../../../domain';

export namespace ListExamplesUseCase {
  export type Input = {
    params: ExampleRepositoryInterface.ExampleSearchParams;
  };

  export type Output = PaginationOutputDto<ExampleModel, Example>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Example Use Case';

    constructor(
      private readonly exampleRepository: ExampleRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const params = new SearchParams<ExampleRepositoryInterface.ExampleFields>(
        { ...input.params },
      );

      const searchResult = await this.exampleRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: ExampleRepositoryInterface.ExampleSearchResult,
    ): Output {
      const entities = searchResult
        .toJSON()
        .items.map((example) => example.toJSON());

      return PaginationOutputMapper.toOutput<
        ExampleModel,
        Example,
        ExampleRepositoryInterface.ExampleFields
      >(entities, searchResult);
    }
  }
}
