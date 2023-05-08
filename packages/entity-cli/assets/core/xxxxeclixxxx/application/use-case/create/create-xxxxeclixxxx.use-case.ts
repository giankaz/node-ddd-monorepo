import { DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  CreateXxxxeclixxxxFactory,
  XxxxeclixxxxRepositoryInterface,
} from '../../../domain';
import { XxxxeclixxxxInput, IXxxxeclixxxx } from '../../dto';

export namespace CreateXxxxeclixxxxUseCase {
  export type Input = XxxxeclixxxxInput;

  export type Output = IXxxxeclixxxx;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Xxxxeclixxxx Use Case';

    constructor(
      private readonly xxxxeclixxxxRepository: XxxxeclixxxxRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(
      input: Input,
      options?: UseCaseOptions,
    ): Promise<Output> {
      const xxxxeclixxxx = CreateXxxxeclixxxxFactory.create(input);

      return (await this.xxxxeclixxxxRepository.insert(xxxxeclixxxx)).toJSON();
    }
  }
}
