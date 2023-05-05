import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { FindByIdExampleUseCase } from '../find-by-id-example.use-case';
import { ExampleInMemoryRepository } from '../../../../infra';

describe('Find By Id Example UseCase Test', () => {
  let useCase: FindByIdExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new FindByIdExampleUseCase.UseCase(repository);
  });
  it('should execute the findById use-case', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    const example = RandomExampleFactory.createOne();

    await repository.insert(example);

    const foundExample = await useCase.execute({
      id: example.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(foundExample).toStrictEqual(example.toJSON());
  });
});
