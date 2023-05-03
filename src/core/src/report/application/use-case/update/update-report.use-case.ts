import { DefaultUseCase } from '../../../../shared';
import { ReportRepositoryInterface } from '../../../domain';
import { IReport, IPartialReport } from '../../dto';

export namespace UpdateReportUseCase {
  export type Input = {
    id: string;
  } & IPartialReport;

  export type Output = IReport;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Report Use Case';

    constructor(
      private readonly reportRepository: ReportRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const entity = await this.reportRepository.findById(input.id);

      const notAllowedFields: Partial<keyof Input>[] = [
        'id',
        'created_at',
        'updated_at',
        'status',
      ];

      for (const key in input) {
        if (!notAllowedFields.includes(key as keyof Input)) {
          entity[key] = input[key];
        }
      }

      return await this.reportRepository.update(entity);
    }
  }
}
