import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../../domain';
import { ActivateCompanyUseCase } from '../../activate-company.use-case';
import { CompanyMongoRepository } from '../../../../../infra';
import { CommonStatus } from '../../../../../../shared';

describe('Activate Company Integration UseCase Test', () => {
  let useCase: ActivateCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyMongoRepository();
    useCase = new ActivateCompanyUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const company = RandomCompanyFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

    await repository.insert(company);

    const foundCompany = await repository.findById(company.id);

    await useCase.execute({
      id: foundCompany.id,
    });

    const foundActivatedCompany = await repository.findById(company.id);

    const jsonCompany = foundActivatedCompany.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonCompany.id).toStrictEqual(foundCompany.id);
    expect(jsonCompany.status).toStrictEqual(CommonStatus.ACTIVE);
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
