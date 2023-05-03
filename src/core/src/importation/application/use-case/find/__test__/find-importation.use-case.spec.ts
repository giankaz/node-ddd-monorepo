import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { FindByIdImportationUseCase } from '../find-by-id-importation.use-case';
import { ImportationInMemoryRepository } from '../../../../infra';

describe('Find By Id Importation UseCase Test', () => {
  let useCase: FindByIdImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new FindByIdImportationUseCase.UseCase(repository);
  });
  it('should execute the findById use-case', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    const importation = RandomImportationFactory.createOne();

    await repository.insert(importation);

    const foundImportation = await useCase.execute({
      id: importation.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(foundImportation).toStrictEqual(importation.toJSON());
  });
});
