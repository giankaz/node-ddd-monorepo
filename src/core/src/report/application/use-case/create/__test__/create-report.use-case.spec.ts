import {
  ReportRepositoryInterface,
  RandomReportFactory,
} from '../../../../domain';
import { ReportInMemoryRepository } from '../../../../infra';
import { CreateReportUseCase } from '../create-report.use-case';

describe('Create Report UseCase Test', () => {
  let useCase: CreateReportUseCase.UseCase;
  let repository: ReportRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ReportInMemoryRepository();
    useCase = new CreateReportUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const report = RandomReportFactory.createOne();

    const output = await useCase.execute(report.props);

    const foundReport = await repository.findById(report.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(report.toJSON()).toStrictEqual(foundReport.toJSON());
    expect(report.toJSON()).toStrictEqual(output);
  });
});
