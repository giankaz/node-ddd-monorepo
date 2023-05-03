import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { SoftDeleteReportUseCase } from '../soft-delete-report.use-case';
import { ReportInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Soft Delete Report UseCase Test', () => {
  let useCase: SoftDeleteReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new SoftDeleteReportUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

    const report = RandomReportFactory.createOne();

    await repository.insert(report);

    const foundReport = await repository.findById(report.id);

    await useCase.execute({
      id: foundReport.id,
    });

    const foundActivatedReport = await repository.findById(report.id);

    const jsonReport = foundActivatedReport.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonReport.id).toStrictEqual(foundReport.id);
    expect(jsonReport.status).toStrictEqual(CommonStatus.DELETED);
  });
});
