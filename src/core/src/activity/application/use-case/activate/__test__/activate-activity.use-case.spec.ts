import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { ActivateActivityUseCase } from '../activate-activity.use-case';
import { ActivityInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Activate Activity UseCase Test', () => {
  let useCase: ActivateActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new ActivateActivityUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const activity = RandomActivityFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

    await repository.insert(activity);

    const foundActivity = await repository.findById(activity.id);

    await useCase.execute({
      id: foundActivity.id,
    });

    const foundActivatedActivity = await repository.findById(activity.id);

    const jsonActivity = foundActivatedActivity.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonActivity.id).toStrictEqual(foundActivity.id);
    expect(jsonActivity.status).toStrictEqual(CommonStatus.ACTIVE);
  });
});
