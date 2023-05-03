import { DefaultUseCase } from '../../../../shared';
import { ImportationRepositoryInterface } from '../../../domain';
import { IImportation, IPartialImportation } from '../../dto';

export namespace UpdateImportationUseCase {
  export type Input = {
    id: string;
  } & IPartialImportation;

  export type Output = IImportation;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Importation Use Case';

    constructor(
      private readonly importationRepository: ImportationRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const entity = await this.importationRepository.findById(input.id);

      const notAllowedFields: Partial<keyof Input>[] = [
        'id',
        'created_at',
        'updated_at',
        'status',
      ];

      for (const key in input) {
        if (!notAllowedFields.includes(key as keyof Input)) {
          entity[key] = input[key];
        }
      }

      return await this.importationRepository.update(entity);
    }
  }
}
