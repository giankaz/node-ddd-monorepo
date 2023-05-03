import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
} from '../../../../shared';
import {
  Activity,
  ActivityModel,
  ActivityRepositoryInterface,
} from '../../../domain';

export namespace ListActivitysUseCase {
  export type Input = {
    params: ActivityRepositoryInterface.ActivitySearchParams;
  };

  export type Output = PaginationOutputDto<ActivityModel, Activity>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Activity Use Case';

    constructor(
      private readonly activityRepository: ActivityRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const params =
        new SearchParams<ActivityRepositoryInterface.ActivityFields>({
          ...input.params,
        });

      const searchResult = await this.activityRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: ActivityRepositoryInterface.ActivitySearchResult,
    ): Output {
      const entities = searchResult
        .toJSON()
        .items.map((activity) => activity.toJSON());

      return PaginationOutputMapper.toOutput<
        ActivityModel,
        Activity,
        ActivityRepositoryInterface.ActivityFields
      >(entities, searchResult);
    }
  }
}
