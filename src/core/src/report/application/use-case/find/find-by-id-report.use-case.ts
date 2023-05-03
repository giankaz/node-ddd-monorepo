import { DefaultUseCase } from '../../../../shared';
import { ReportRepositoryInterface } from '../../../domain';
import { IReport } from '../../dto';

export namespace FindByIdReportUseCase {
  export type Input = {
    id: string;
  };

  export type Output = IReport;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Report Use Case';

    constructor(
      private readonly reportRepository: ReportRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      return (await this.reportRepository.findById(input.id)).toJSON();
    }
  }
}
