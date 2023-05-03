import {
  DefaultUseCase,
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchParams,
} from '../../../../shared';
import {
  Report,
  ReportModel,
  ReportRepositoryInterface,
} from '../../../domain';

export namespace ListReportsUseCase {
  export type Input = {
    params: ReportRepositoryInterface.ReportSearchParams;
  };

  export type Output = PaginationOutputDto<ReportModel, Report>;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Report Use Case';

    constructor(
      private readonly reportRepository: ReportRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const params = new SearchParams<ReportRepositoryInterface.ReportFields>({
        ...input.params,
      });

      const searchResult = await this.reportRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: ReportRepositoryInterface.ReportSearchResult,
    ): Output {
      const entities = searchResult
        .toJSON()
        .items.map((report) => report.toJSON());

      return PaginationOutputMapper.toOutput<
        ReportModel,
        Report,
        ReportRepositoryInterface.ReportFields
      >(entities, searchResult);
    }
  }
}
