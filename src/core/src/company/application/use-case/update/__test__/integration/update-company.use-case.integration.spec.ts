import {
  CompanyRepositoryInterface,
  RandomCompanyFactory,
} from '../../../../../domain';
import { CompanyMongoRepository } from '../../../../../infra';
import { UpdateCompanyUseCase } from '../../update-company.use-case';

describe('Update Company Unity UseCase Test', () => {
  let useCase: UpdateCompanyUseCase.UseCase;
  let repository: CompanyRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new CompanyMongoRepository();
    useCase = new UpdateCompanyUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const company = RandomCompanyFactory.createOne();
    const company2 = RandomCompanyFactory.createOne();

    await repository.insertMany([company, company2]);

    await useCase.execute({
      ...company2.toJSON(),
      id: company.id,
    });

    const foundCompany = await repository.findById(company.id);

    const jsonCompany = foundCompany.toJSON();

    const notAllowedFields: Partial<keyof typeof jsonCompany>[] = [
      'id',
      'created_at',
      'updated_at',
      'status',
    ];

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonCompany.id).toStrictEqual(company.id);
    for (const key in jsonCompany) {
      if (!notAllowedFields.includes(key as keyof typeof jsonCompany)) {
        expect(jsonCompany[key]).toStrictEqual(company2.toJSON()[key]);
      }
    }
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
