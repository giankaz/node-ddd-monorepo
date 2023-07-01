import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { XxxxeclixxxxInMemoryRepository } from '../../../../../infra';
import { UpdateXxxxeclixxxxUseCase } from '../../update-xxxxeclixxxx.use-case';

describe('Update Xxxxeclixxxx Unity UseCase Test', () => {
  let useCase: UpdateXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxInMemoryRepository();
    useCase = new UpdateXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const xxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    const xxxxeclixxxx2 = RandomXxxxeclixxxxFactory.createOne();

    await repository.insertMany([xxxxeclixxxx, xxxxeclixxxx2]);

    await useCase.execute({
      id: xxxxeclixxxx.id,
    });

    const foundXxxxeclixxxx = await repository.findById(xxxxeclixxxx.id);

    const jsonXxxxeclixxxx = foundXxxxeclixxxx.toJSON();

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonXxxxeclixxxx.id).toStrictEqual(xxxxeclixxxx.id);
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
