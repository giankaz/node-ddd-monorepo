import { translate } from 'translation';
import { CoreError, DefaultUseCase, UseCaseOptions } from '../../../../shared';
import { XxxxeclixxxxRepositoryInterface } from '../../../domain';
import { IXxxxeclixxxx } from '../../dto';
import { XxxxeclixxxxNotFoundErrorFactory } from '../../../domain/errors';

export namespace FindByIdXxxxeclixxxxUseCase {
  export type Input = {
    id: string;
  };

  export type Output = IXxxxeclixxxx;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Xxxxeclixxxx Use Case';

    constructor(
      private readonly xxxxeclixxxxRepository: XxxxeclixxxxRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const xxxxeclixxxx = await this.xxxxeclixxxxRepository.findById(input.id);

      if (!xxxxeclixxxx) {
        throw XxxxeclixxxxNotFoundErrorFactory.create(options.language);
      }

      return xxxxeclixxxx.toJSON();
    }
  }
}
