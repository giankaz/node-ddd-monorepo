import { DefaultUseCase } from '../../../../shared';
import { ImportationRepositoryInterface } from '../../../domain';

export namespace ActivateImportationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Activate Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.importationRepository.activate(input.id);
      return;
    }
  }
}
