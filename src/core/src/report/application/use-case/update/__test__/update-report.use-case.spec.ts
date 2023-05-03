import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { ReportInMemoryRepository } from '../../../../infra';
import { UpdateReportUseCase } from '../update-report.use-case';

describe('Update Report UseCase Test', () => {
  let useCase: UpdateReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new UpdateReportUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const report = RandomReportFactory.createOne();
    const report2 = RandomReportFactory.createOne();

    await repository.insertMany([report, report2]);

    await useCase.execute({
      ...report2.toJSON(),
      id: report.id,
    });

    const foundReport = await repository.findById(report.id);

    const jsonReport = foundReport.toJSON();

    const notAllowedFields: Partial<keyof typeof jsonReport>[] = [
      'id',
      'created_at',
      'updated_at',
      'status',
    ];

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonReport.id).toStrictEqual(report.id);
    for (const key in jsonReport) {
      if (!notAllowedFields.includes(key as keyof typeof jsonReport)) {
        expect(jsonReport[key]).toStrictEqual(report2.toJSON()[key]);
      }
    }
  });
});
