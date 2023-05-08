import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  XxxxeclixxxxNotFoundErrorFactory,
  XxxxeclixxxxRepositoryInterface,
} from '../../../domain';
import { IXxxxeclixxxx } from '../../dto';

export namespace InactivateXxxxeclixxxxUseCase {
  export type Input = {
    id: string;
  };

  export type Output = IXxxxeclixxxx;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Inactivate Xxxxeclixxxx Use Case';

    constructor(
      private readonly xxxxeclixxxxRepository: XxxxeclixxxxRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const xxxxeclixxxx = await this.xxxxeclixxxxRepository.inactivate(
        input.id,
      );

      if (!xxxxeclixxxx) {
        throw XxxxeclixxxxNotFoundErrorFactory.create(options.language);
      }

      return xxxxeclixxxx.toJSON();
    }
  }
}
