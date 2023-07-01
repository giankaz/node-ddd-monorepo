import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  XxxxeclixxxxNotFoundErrorFactory,
  XxxxeclixxxxRepositoryInterface,
} from '../../../domain';

export namespace DeleteXxxxeclixxxxUseCase {
  export type Input = {
    id: string;
  };

  export type Output = boolean;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Delete Xxxxeclixxxx Use Case';

    constructor(
      private readonly xxxxeclixxxxRepository: XxxxeclixxxxRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const result = await this.xxxxeclixxxxRepository.delete(input.id);

      if (result === undefined) {
        throw XxxxeclixxxxNotFoundErrorFactory.create(options.language);
      }

      return result;
    }
  }
}
