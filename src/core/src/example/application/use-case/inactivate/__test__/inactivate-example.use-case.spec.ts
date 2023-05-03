import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { InactivateExampleUseCase } from '../inactivate-example.use-case';
import { ExampleInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Inactivate Example UseCase Test', () => {
  let useCase: InactivateExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new InactivateExampleUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

    const example = RandomExampleFactory.createOne();

    await repository.insert(example);

    const foundExample = await repository.findById(example.id);

    await useCase.execute({
      id: foundExample.id,
    });

    const foundActivatedExample = await repository.findById(example.id);

    const jsonExample = foundActivatedExample.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonExample.id).toStrictEqual(foundExample.id);
    expect(jsonExample.status).toStrictEqual(CommonStatus.INACTIVE);
  });
});
