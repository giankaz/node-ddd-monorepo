import { DefaultUseCase } from '../../../../shared';
import { ReportRepositoryInterface } from '../../../domain';

export namespace InactivateReportUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Inactivate Report Use Case';

    constructor(
      private readonly reportRepository: ReportRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.reportRepository.inactivate(input.id);
      return;
    }
  }
}
