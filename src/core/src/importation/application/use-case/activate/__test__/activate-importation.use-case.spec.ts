import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { ActivateImportationUseCase } from '../activate-importation.use-case';
import { ImportationInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Activate Importation UseCase Test', () => {
  let useCase: ActivateImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new ActivateImportationUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const importation = RandomImportationFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

    await repository.insert(importation);

    const foundImportation = await repository.findById(importation.id);

    await useCase.execute({
      id: foundImportation.id,
    });

    const foundActivatedImportation = await repository.findById(importation.id);

    const jsonImportation = foundActivatedImportation.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonImportation.id).toStrictEqual(foundImportation.id);
    expect(jsonImportation.status).toStrictEqual(CommonStatus.ACTIVE);
  });
});
