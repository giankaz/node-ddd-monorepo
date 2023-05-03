import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { DeleteActivityUseCase } from '../delete-activity.use-case';
import { ActivityInMemoryRepository } from '../../../../infra';

describe('Delete Activity UseCase Test', () => {
  let useCase: DeleteActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new DeleteActivityUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const activity = RandomActivityFactory.createOne();

    await repository.insert(activity);

    const foundActivity = await repository.findById(activity.id);

    await useCase.execute({
      id: foundActivity.id,
    });

    expect(async () => {
      await repository.findById(activity.id);
    }).rejects.toThrow();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
