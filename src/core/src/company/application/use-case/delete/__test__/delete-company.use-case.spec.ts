import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../domain';
import { DeleteCompanyUseCase } from '../delete-company.use-case';
import { CompanyInMemoryRepository } from '../../../../infra';

describe('Delete Company UseCase Test', () => {
  let useCase: DeleteCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyInMemoryRepository();
    useCase = new DeleteCompanyUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const company = RandomCompanyFactory.createOne();

    await repository.insert(company);

    const foundCompany = await repository.findById(company.id);

    await useCase.execute({
      id: foundCompany.id,
    });

    expect(async () => {
      await repository.findById(company.id);
    }).rejects.toThrow();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
