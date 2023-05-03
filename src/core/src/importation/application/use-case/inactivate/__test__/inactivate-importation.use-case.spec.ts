import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { InactivateImportationUseCase } from '../inactivate-importation.use-case';
import { ImportationInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Inactivate Importation UseCase Test', () => {
  let useCase: InactivateImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new InactivateImportationUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

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
    expect(jsonImportation.status).toStrictEqual(CommonStatus.INACTIVE);
  });
});
