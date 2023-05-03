import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { ImportationInMemoryRepository } from '../../../../infra';
import { UpdateImportationUseCase } from '../update-importation.use-case';

describe('Update Importation UseCase Test', () => {
  let useCase: UpdateImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new UpdateImportationUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const importation = RandomImportationFactory.createOne();
    const importation2 = RandomImportationFactory.createOne();

    await repository.insertMany([importation, importation2]);

    await useCase.execute({
      ...importation2.toJSON(),
      id: importation.id,
    });

    const foundImportation = await repository.findById(importation.id);

    const jsonImportation = foundImportation.toJSON();

    const notAllowedFields: Partial<keyof typeof jsonImportation>[] = [
      'id',
      'created_at',
      'updated_at',
      'status',
    ];

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonImportation.id).toStrictEqual(importation.id);
    for (const key in jsonImportation) {
      if (!notAllowedFields.includes(key as keyof typeof jsonImportation)) {
        expect(jsonImportation[key]).toStrictEqual(importation2.toJSON()[key]);
      }
    }
  });
});
