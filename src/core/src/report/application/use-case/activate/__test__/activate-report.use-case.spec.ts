import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { ActivateReportUseCase } from '../activate-report.use-case';
import { ReportInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Activate Report UseCase Test', () => {
  let useCase: ActivateReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new ActivateReportUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const report = RandomReportFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

    await repository.insert(report);

    const foundReport = await repository.findById(report.id);

    await useCase.execute({
      id: foundReport.id,
    });

    const foundActivatedReport = await repository.findById(report.id);

    const jsonReport = foundActivatedReport.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonReport.id).toStrictEqual(foundReport.id);
    expect(jsonReport.status).toStrictEqual(CommonStatus.ACTIVE);
  });
});
