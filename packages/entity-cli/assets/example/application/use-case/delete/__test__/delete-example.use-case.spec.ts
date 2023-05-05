import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { DeleteExampleUseCase } from '../delete-example.use-case';
import { ExampleInMemoryRepository } from '../../../../infra';

describe('Delete Example UseCase Test', () => {
  let useCase: DeleteExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new DeleteExampleUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const example = RandomExampleFactory.createOne();

    await repository.insert(example);

    const foundExample = await repository.findById(example.id);

    await useCase.execute({
      id: foundExample.id,
    });

    expect(async () => {
      await repository.findById(example.id);
    }).rejects.toThrow();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
