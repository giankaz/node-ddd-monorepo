import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { SoftDeleteActivityUseCase } from '../soft-delete-activity.use-case';
import { ActivityInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Soft Delete Activity UseCase Test', () => {
  let useCase: SoftDeleteActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new SoftDeleteActivityUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

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
    expect(jsonActivity.status).toStrictEqual(CommonStatus.DELETED);
  });
});
