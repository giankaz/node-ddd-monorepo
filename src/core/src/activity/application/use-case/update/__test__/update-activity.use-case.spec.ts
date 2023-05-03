import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { ActivityInMemoryRepository } from '../../../../infra';
import { UpdateActivityUseCase } from '../update-activity.use-case';

describe('Update Activity UseCase Test', () => {
  let useCase: UpdateActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new UpdateActivityUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const activity = RandomActivityFactory.createOne();
    const activity2 = RandomActivityFactory.createOne();

    await repository.insertMany([activity, activity2]);

    await useCase.execute({
      ...activity2.toJSON(),
      id: activity.id,
    });

    const foundActivity = await repository.findById(activity.id);

    const jsonActivity = foundActivity.toJSON();

    const notAllowedFields: Partial<keyof typeof jsonActivity>[] = [
      'id',
      'created_at',
      'updated_at',
      'status',
    ];

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonActivity.id).toStrictEqual(activity.id);
    for (const key in jsonActivity) {
      if (!notAllowedFields.includes(key as keyof typeof jsonActivity)) {
        expect(jsonActivity[key]).toStrictEqual(activity2.toJSON()[key]);
      }
    }
  });
});
