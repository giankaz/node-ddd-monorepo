import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { ExampleInMemoryRepository } from '../../../../infra';
import { CreateExampleUseCase } from '../create-example.use-case';

describe('Create Example UseCase Test', () => {
  let useCase: CreateExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new CreateExampleUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const example = RandomExampleFactory.createOne();

    const output = await useCase.execute(example.props);

    const foundExample = await repository.findById(example.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(example.toJSON()).toStrictEqual(foundExample.toJSON());
    expect(example.toJSON()).toStrictEqual(output);
  });
});
