import { DefaultUseCase } from '../../../../shared';
import { ImportationRepositoryInterface } from '../../../domain';

export namespace DeleteImportationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Delete Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.importationRepository.delete(input.id);
      return;
    }
  }
}
