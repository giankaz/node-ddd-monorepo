import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { SoftDeleteExampleUseCase } from '../soft-delete-example.use-case';
import { ExampleInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Soft Delete Example UseCase Test', () => {
  let useCase: SoftDeleteExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new SoftDeleteExampleUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

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
    expect(jsonExample.status).toStrictEqual(CommonStatus.DELETED);
  });
});
