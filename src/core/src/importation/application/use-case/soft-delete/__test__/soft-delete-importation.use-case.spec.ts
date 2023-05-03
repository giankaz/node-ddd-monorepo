import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { SoftDeleteImportationUseCase } from '../soft-delete-importation.use-case';
import { ImportationInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Soft Delete Importation UseCase Test', () => {
  let useCase: SoftDeleteImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new SoftDeleteImportationUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

    const importation = RandomImportationFactory.createOne();

    await repository.insert(importation);

    const foundImportation = await repository.findById(importation.id);

    await useCase.execute({
      id: foundImportation.id,
    });

    const foundActivatedImportation = await repository.findById(importation.id);

    const jsonImportation = foundActivatedImportation.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonImportation.id).toStrictEqual(foundImportation.id);
    expect(jsonImportation.status).toStrictEqual(CommonStatus.DELETED);
  });
});
