import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { FindByIdReportUseCase } from '../find-by-id-report.use-case';
import { ReportInMemoryRepository } from '../../../../infra';

describe('Find By Id Report UseCase Test', () => {
  let useCase: FindByIdReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new FindByIdReportUseCase.UseCase(repository);
  });
  it('should execute the findById use-case', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    const report = RandomReportFactory.createOne();

    await repository.insert(report);

    const foundReport = await useCase.execute({
      id: report.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(foundReport).toStrictEqual(report.toJSON());
  });
});
