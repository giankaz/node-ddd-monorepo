import { DefaultUseCase } from '../../../../shared';
import { LeadRepositoryInterface } from '../../../domain';

export namespace ActivateLeadUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Activate Lead Use Case';

    constructor(
      private readonly leadRepository: LeadRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.leadRepository.activate(input.id);
      return;
    }
  }
}
