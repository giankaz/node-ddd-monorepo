import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { FindByIdXxxxeclixxxxUseCase } from '../../find-by-id-xxxxeclixxxx.use-case';
import { XxxxeclixxxxInMemoryRepository } from '../../../../../infra';

describe('Find By Id Xxxxeclixxxx Unitary UseCase Test', () => {
  let useCase: FindByIdXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxInMemoryRepository();
    useCase = new FindByIdXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the findById use-case', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    const xxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();

    await repository.insert(xxxxeclixxxx);

    const foundXxxxeclixxxx = await useCase.execute({
      id: xxxxeclixxxx.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(foundXxxxeclixxxx).toStrictEqual(xxxxeclixxxx.toJSON());
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
