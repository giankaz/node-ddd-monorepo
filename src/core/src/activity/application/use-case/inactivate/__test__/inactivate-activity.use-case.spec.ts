import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { InactivateActivityUseCase } from '../inactivate-activity.use-case';
import { ActivityInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Inactivate Activity UseCase Test', () => {
  let useCase: InactivateActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new InactivateActivityUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

    const activity = RandomActivityFactory.createOne();

    await repository.insert(activity);

    const foundActivity = await repository.findById(activity.id);

    await useCase.execute({
      id: foundActivity.id,
    });

    const foundActivatedActivity = await repository.findById(activity.id);

    const jsonActivity = foundActivatedActivity.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonActivity.id).toStrictEqual(foundActivity.id);
    expect(jsonActivity.status).toStrictEqual(CommonStatus.INACTIVE);
  });
});
