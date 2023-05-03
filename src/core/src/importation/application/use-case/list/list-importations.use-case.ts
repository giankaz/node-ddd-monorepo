import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
} from '../../../../shared';
import {
  Importation,
  ImportationModel,
  ImportationRepositoryInterface,
} from '../../../domain';

export namespace ListImportationsUseCase {
  export type Input = {
    params: ImportationRepositoryInterface.ImportationSearchParams;
  };

  export type Output = PaginationOutputDto<ImportationModel, Importation>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const params =
        new SearchParams<ImportationRepositoryInterface.ImportationFields>({
          ...input.params,
        });

      const searchResult = await this.importationRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: ImportationRepositoryInterface.ImportationSearchResult,
    ): Output {
      const entities = searchResult
        .toJSON()
        .items.map((importation) => importation.toJSON());

      return PaginationOutputMapper.toOutput<
        ImportationModel,
        Importation,
        ImportationRepositoryInterface.ImportationFields
      >(entities, searchResult);
    }
  }
}
