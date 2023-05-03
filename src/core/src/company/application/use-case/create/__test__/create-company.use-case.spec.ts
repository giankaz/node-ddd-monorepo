import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../domain';
import { CompanyInMemoryRepository } from '../../../../infra';
import { CreateCompanyUseCase } from '../create-company.use-case';

describe('Create Company UseCase Test', () => {
  let useCase: CreateCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyInMemoryRepository();
    useCase = new CreateCompanyUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const company = RandomCompanyFactory.createOne();

    const output = await useCase.execute(company.props);

    const foundCompany = await repository.findById(company.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(company.toJSON()).toStrictEqual(foundCompany.toJSON());
    expect(company.toJSON()).toStrictEqual(output);
  });
});
