import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../../domain';
import { SoftDeleteCompanyUseCase } from '../../soft-delete-company.use-case';
import { CompanyInMemoryRepository } from '../../../../../infra';
import { CommonStatus } from '../../../../../../shared';

describe('Soft Delete Company Unity UseCase Test', () => {
  let useCase: SoftDeleteCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyInMemoryRepository();
    useCase = new SoftDeleteCompanyUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

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
    expect(jsonCompany.status).toStrictEqual(CommonStatus.DELETED);
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
