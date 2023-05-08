import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { DeleteXxxxeclixxxxUseCase } from '../../delete-xxxxeclixxxx.use-case';
import { XxxxeclixxxxInMemoryRepository } from '../../../../../infra';

describe('Delete Xxxxeclixxxx Unitary UseCase Test', () => {
  let useCase: DeleteXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxInMemoryRepository();
    useCase = new DeleteXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const xxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();

    await repository.insert(xxxxeclixxxx);

    const foundXxxxeclixxxx = await repository.findById(xxxxeclixxxx.id);

    await useCase.execute({
      id: foundXxxxeclixxxx.id,
    });

    const result = await repository.findById(xxxxeclixxxx.id);

    expect(result).toBeUndefined();
    expect(spyDelete).toHaveBeenCalledTimes(1);
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
