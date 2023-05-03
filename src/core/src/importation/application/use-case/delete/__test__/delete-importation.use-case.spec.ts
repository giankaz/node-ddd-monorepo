import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { DeleteImportationUseCase } from '../delete-importation.use-case';
import { ImportationInMemoryRepository } from '../../../../infra';

describe('Delete Importation UseCase Test', () => {
  let useCase: DeleteImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new DeleteImportationUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const importation = RandomImportationFactory.createOne();

    await repository.insert(importation);

    const foundImportation = await repository.findById(importation.id);

    await useCase.execute({
      id: foundImportation.id,
    });

    expect(async () => {
      await repository.findById(importation.id);
    }).rejects.toThrow();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
