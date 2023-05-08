import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../../domain';
import { InactivateCompanyUseCase } from '../../inactivate-company.use-case';
import { CompanyInMemoryRepository } from '../../../../../infra';
import { CommonStatus } from '../../../../../../shared';

describe('Inactivate Company Unitary UseCase Test', () => {
  let useCase: InactivateCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyInMemoryRepository();
    useCase = new InactivateCompanyUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

    const company = RandomCompanyFactory.createOne();

    await repository.insert(company);

    const foundCompany = await repository.findById(company.id);

    await useCase.execute({
      id: foundCompany.id,
    });

    const foundActivatedCompany = await repository.findById(company.id);

    const jsonCompany = foundActivatedCompany.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonCompany.id).toStrictEqual(foundCompany.id);
    expect(jsonCompany.status).toStrictEqual(CommonStatus.INACTIVE);
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
