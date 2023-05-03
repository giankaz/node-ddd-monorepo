import {
  ExampleRepositoryInterface,
  RandomExampleFactory,
} from '../../../../domain';
import { ExampleInMemoryRepository } from '../../../../infra';
import { UpdateExampleUseCase } from '../update-example.use-case';

describe('Update Example UseCase Test', () => {
  let useCase: UpdateExampleUseCase.UseCase;
  let repository: ExampleRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    useCase = new UpdateExampleUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const example = RandomExampleFactory.createOne();
    const example2 = RandomExampleFactory.createOne();

    await repository.insertMany([example, example2]);

    await useCase.execute({
      ...example2.props,
      id: example.id,
    });

    const foundExample = await repository.findById(example.id);

    const jsonExample = foundExample.toJSON();

    const notAllowedFields: Partial<keyof typeof jsonExample>[] = [
      'id',
      'created_at',
      'updated_at',
      'status',
    ];

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonExample.id).toStrictEqual(example.id);
    for (const key in jsonExample) {
      if (!notAllowedFields.includes(key as keyof typeof jsonExample)) {
        expect(jsonExample[key]).toStrictEqual(example2.toJSON()[key]);
      }
    }
  });
});
