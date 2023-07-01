import { DefaultUseCase, UseCaseOptions } from '../../../../shared';
import {
  XxxxeclixxxxNotFoundErrorFactory,
  XxxxeclixxxxRepositoryInterface,
} from '../../../domain';
import { IXxxxeclixxxx, IPartialXxxxeclixxxx } from '../../dto';

export namespace UpdateXxxxeclixxxxUseCase {
  export type Input = {
    id: string;
  } & Omit<IPartialXxxxeclixxxx, 'id' | 'created_at' | 'updated_at'>;

  export type Output = IXxxxeclixxxx;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Xxxxeclixxxx Use Case';

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
        throw XxxxeclixxxxNotFoundErrorFactory.create(options?.language);
      }

      return await this.xxxxeclixxxxRepository.update(xxxxeclixxxx);
    }
  }
}
