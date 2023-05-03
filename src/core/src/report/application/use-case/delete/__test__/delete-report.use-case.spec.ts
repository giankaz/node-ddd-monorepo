import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { DeleteReportUseCase } from '../delete-report.use-case';
import { ReportInMemoryRepository } from '../../../../infra';

describe('Delete Report UseCase Test', () => {
  let useCase: DeleteReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new DeleteReportUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const report = RandomReportFactory.createOne();

    await repository.insert(report);

    const foundReport = await repository.findById(report.id);

    await useCase.execute({
      id: foundReport.id,
    });

    expect(async () => {
      await repository.findById(report.id);
    }).rejects.toThrow();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
