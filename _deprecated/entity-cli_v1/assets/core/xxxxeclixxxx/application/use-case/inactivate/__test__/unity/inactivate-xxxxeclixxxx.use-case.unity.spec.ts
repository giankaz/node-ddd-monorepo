import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { InactivateXxxxeclixxxxUseCase } from '../../inactivate-xxxxeclixxxx.use-case';
import { XxxxeclixxxxInMemoryRepository } from '../../../../../infra';
import { CommonStatus } from '../../../../../../shared';

describe('Inactivate Xxxxeclixxxx Unitary UseCase Test', () => {
  let useCase: InactivateXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxInMemoryRepository();
    useCase = new InactivateXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

    const xxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();

    await repository.insert(xxxxeclixxxx);

    const foundXxxxeclixxxx = await repository.findById(xxxxeclixxxx.id);

    await useCase.execute({
      id: foundXxxxeclixxxx.id,
    });

    const foundActivatedXxxxeclixxxx = await repository.findById(
      xxxxeclixxxx.id,
    );

    const jsonXxxxeclixxxx = foundActivatedXxxxeclixxxx.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonXxxxeclixxxx.id).toStrictEqual(foundXxxxeclixxxx.id);
    expect(jsonXxxxeclixxxx.status).toStrictEqual(CommonStatus.INACTIVE);
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
