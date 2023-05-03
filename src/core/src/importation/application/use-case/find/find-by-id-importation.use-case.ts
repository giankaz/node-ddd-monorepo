import { DefaultUseCase } from '../../../../shared';
import { ImportationRepositoryInterface } from '../../../domain';
import { IImportation } from '../../dto';

export namespace FindByIdImportationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = IImportation;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      return (await this.importationRepository.findById(input.id)).toJSON();
    }
  }
}
