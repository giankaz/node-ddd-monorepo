import {
  ImportationRepositoryInterface,
  RandomImportationFactory,
} from '../../../../domain';
import { ImportationInMemoryRepository } from '../../../../infra';
import { CreateImportationUseCase } from '../create-importation.use-case';

describe('Create Importation UseCase Test', () => {
  let useCase: CreateImportationUseCase.UseCase;
  let repository: ImportationRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ImportationInMemoryRepository();
    useCase = new CreateImportationUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const importation = RandomImportationFactory.createOne();

    const output = await useCase.execute(importation.props);

    const foundImportation = await repository.findById(importation.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(importation.toJSON()).toStrictEqual(foundImportation.toJSON());
    expect(importation.toJSON()).toStrictEqual(output);
  });
});
