import {
  XxxxeclixxxxRepositoryInterface,
  RandomXxxxeclixxxxFactory,
} from '../../../../../domain';
import { XxxxeclixxxxMongoRepository } from '../../../../../infra';
import { CreateXxxxeclixxxxUseCase } from '../../create-xxxxeclixxxx.use-case';

describe('Create Xxxxeclixxxx Integration UseCase Test', () => {
  let useCase: CreateXxxxeclixxxxUseCase.UseCase;
  let repository: XxxxeclixxxxRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new XxxxeclixxxxMongoRepository();
    useCase = new CreateXxxxeclixxxxUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const xxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();

    const output = await useCase.execute(xxxxeclixxxx.props);

    const foundXxxxeclixxxx = await repository.findById(xxxxeclixxxx.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(xxxxeclixxxx.toJSON()).toStrictEqual(foundXxxxeclixxxx.toJSON());
    expect(xxxxeclixxxx.toJSON()).toStrictEqual(output);
  });
});
