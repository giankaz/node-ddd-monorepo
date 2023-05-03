import {
  ActivityRepositoryInterface,
  RandomActivityFactory,
} from '../../../../domain';
import { FindByIdActivityUseCase } from '../find-by-id-activity.use-case';
import { ActivityInMemoryRepository } from '../../../../infra';

describe('Find By Id Activity UseCase Test', () => {
  let useCase: FindByIdActivityUseCase.UseCase;
  let repository: ActivityRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ActivityInMemoryRepository();
    useCase = new FindByIdActivityUseCase.UseCase(repository);
  });
  it('should execute the findById use-case', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    const activity = RandomActivityFactory.createOne();

    await repository.insert(activity);

    const foundActivity = await useCase.execute({
      id: activity.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(foundActivity).toStrictEqual(activity.toJSON());
  });
});
