import { DefaultUseCase } from '../../../../shared';
import {
  CreateReportFactory,
  ReportRepositoryInterface,
} from '../../../domain';
import { ReportInput, IReport } from '../../dto';

export namespace CreateReportUseCase {
  export type Input = ReportInput;

  export type Output = IReport;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Report Use Case';

    constructor(
      private readonly reportRepository: ReportRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const report = CreateReportFactory.create(input);

      return (await this.reportRepository.insert(report)).toJSON();
    }
  }
}
