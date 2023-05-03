import { DefaultUseCase } from '../../../../shared';
import { ExampleRepositoryInterface } from '../../../domain';

export namespace DeleteExampleUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Delete Example Use Case';

    constructor(
      private readonly exampleRepository: ExampleRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.exampleRepository.delete(input.id);
      return;
    }
  }
}
