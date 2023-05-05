import { DefaultUseCase } from '../../../../shared';
import { ExampleRepositoryInterface } from '../../../domain';
import { IExample } from '../../dto';

export namespace FindByIdExampleUseCase {
  export type Input = {
    id: string;
  };

  export type Output = IExample;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Example Use Case';

    constructor(
      private readonly exampleRepository: ExampleRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      return (await this.exampleRepository.findById(input.id)).toJSON();
    }
  }
}
