import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { ActivityInMemoryRepository } from '../../../../infra';
import { CreateActivityUseCase } from '../create-activity.use-case';

describe('Create Activity UseCase Test', () => {
  let useCase: CreateActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new CreateActivityUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const activity = RandomActivityFactory.createOne();

    const output = await useCase.execute(activity.props);

    const foundActivity = await repository.findById(activity.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(activity.toJSON()).toStrictEqual(foundActivity.toJSON());
    expect(activity.toJSON()).toStrictEqual(output);
  });
});
