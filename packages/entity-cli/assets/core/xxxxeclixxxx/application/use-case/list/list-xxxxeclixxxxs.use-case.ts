import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
  UseCaseOptions,
} from '../../../../shared';
import { Xxxxeclixxxx, XxxxeclixxxxRepositoryInterface } from '../../../domain';
import { IXxxxeclixxxx } from '../../dto';

export namespace ListXxxxeclixxxxsUseCase {
  export type Input = {
    params: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxSearchParams;
  };

  export type Output = PaginationOutputDto<IXxxxeclixxxx>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'List Xxxxeclixxxxs Use Case';

    constructor(
      private readonly xxxxeclixxxxRepository: XxxxeclixxxxRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const params =
        new SearchParams<XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields>(
          input.params,
        );

      const searchResult = await this.xxxxeclixxxxRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxSearchResult,
    ): Output {
      const entities = searchResult.items.map((xxxxeclixxxx) =>
        xxxxeclixxxx.toJSON(),
      );

      return PaginationOutputMapper.toOutput<
        IXxxxeclixxxx,
        Xxxxeclixxxx,
        XxxxeclixxxxRepositoryInterface.XxxxeclixxxxFields
      >(entities, searchResult);
    }
  }
}
