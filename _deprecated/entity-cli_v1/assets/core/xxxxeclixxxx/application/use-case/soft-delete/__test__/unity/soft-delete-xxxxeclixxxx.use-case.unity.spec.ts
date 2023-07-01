import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { SoftDeleteXxxxeclixxxxUseCase } from '../../soft-delete-xxxxeclixxxx.use-case';
import { XxxxeclixxxxInMemoryRepository } from '../../../../../infra';
import { CommonStatus } from '../../../../../../shared';

describe('Soft Delete Xxxxeclixxxx Unity UseCase Test', () => {
  let useCase: SoftDeleteXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxInMemoryRepository();
    useCase = new SoftDeleteXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

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
    expect(jsonXxxxeclixxxx.status).toStrictEqual(CommonStatus.DELETED);
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
