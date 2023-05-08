import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../../domain';
import { DeleteCompanyUseCase } from '../../delete-company.use-case';
import { CompanyMongoRepository } from '../../../../../infra';

describe('Delete Company Integration UseCase Test', () => {
  let useCase: DeleteCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyMongoRepository();
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

    const result = await repository.findById(company.id);

    expect(result).toBeUndefined();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });

  it('should throw when not found', async () => {
    expect(async () => {
      await useCase.execute(
        {
          id: 'fake',
        },
        {
          language: 'en',
          silent: true,
        },
      );
    }).rejects.toThrow();
  });
});
