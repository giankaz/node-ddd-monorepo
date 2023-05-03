import { DefaultUseCase } from '../../../../shared';
import { LeadRepositoryInterface } from '../../../domain';

export namespace SoftDeleteLeadUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Soft Delete Lead Use Case';

    constructor(
      private readonly leadRepository: LeadRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.leadRepository.softDelete(input.id);
      return;
    }
  }
}
