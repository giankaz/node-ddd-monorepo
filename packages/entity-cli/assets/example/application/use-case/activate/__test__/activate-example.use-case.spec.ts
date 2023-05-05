import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { ActivateExampleUseCase } from '../activate-example.use-case';
import { ExampleInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Activate Example UseCase Test', () => {
  let useCase: ActivateExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new ActivateExampleUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const example = RandomExampleFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

    await repository.insert(example);

    const foundExample = await repository.findById(example.id);

    await useCase.execute({
      id: foundExample.id,
    });

    const foundActivatedExample = await repository.findById(example.id);

    const jsonExample = foundActivatedExample.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonExample.id).toStrictEqual(foundExample.id);
    expect(jsonExample.status).toStrictEqual(CommonStatus.ACTIVE);
  });
});
