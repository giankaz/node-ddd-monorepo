import { DefaultUseCase } from '../../../../shared';
import {
  CreateExampleFactory,
  ExampleRepositoryInterface,
} from '../../../domain';
import { ExampleInput, IExample } from '../../dto';

export namespace CreateExampleUseCase {
  export type Input = ExampleInput;

  export type Output = IExample;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Example Use Case';

    constructor(
      private readonly exampleRepository: ExampleRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const example = CreateExampleFactory.create(input);

      return (await this.exampleRepository.insert(example)).toJSON();
    }
  }
}
