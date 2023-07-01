import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { ActivateXxxxeclixxxxUseCase } from '../../activate-xxxxeclixxxx.use-case';
import { XxxxeclixxxxMongoRepository } from '../../../../../infra';
import { CommonStatus } from '../../../../../../shared';

describe('Activate Xxxxeclixxxx Integration UseCase Test', () => {
  let useCase: ActivateXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxMongoRepository();
    useCase = new ActivateXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const xxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

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
    expect(jsonXxxxeclixxxx.status).toStrictEqual(CommonStatus.ACTIVE);
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
