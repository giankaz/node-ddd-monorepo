import { DefaultUseCase } from '../../../../shared';
import { ImportationRepositoryInterface } from '../../../domain';

export namespace SoftDeleteImportationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Soft Delete Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.importationRepository.softDelete(input.id);
      return;
    }
  }
}
