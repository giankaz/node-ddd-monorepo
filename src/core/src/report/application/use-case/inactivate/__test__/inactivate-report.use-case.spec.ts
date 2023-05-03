import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { InactivateReportUseCase } from '../inactivate-report.use-case';
import { ReportInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Inactivate Report UseCase Test', () => {
  let useCase: InactivateReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new InactivateReportUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

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
    expect(jsonReport.status).toStrictEqual(CommonStatus.INACTIVE);
  });
});
