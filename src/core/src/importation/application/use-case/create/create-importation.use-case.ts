import { DefaultUseCase } from '../../../../shared';
import {
  CreateImportationFactory,
  ImportationRepositoryInterface,
} from '../../../domain';
import { ImportationInput, IImportation } from '../../dto';

export namespace CreateImportationUseCase {
  export type Input = ImportationInput;

  export type Output = IImportation;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const importation = CreateImportationFactory.create(input);

      return (await this.importationRepository.insert(importation)).toJSON();
    }
  }
}
