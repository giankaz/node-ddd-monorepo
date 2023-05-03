import { DefaultUseCase } from '../../../../shared';
import { CreateLeadFactory, LeadRepositoryInterface } from '../../../domain';
import { LeadInput, ILead } from '../../dto';

export namespace CreateLeadUseCase {
  export type Input = LeadInput;

  export type Output = ILead;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Lead Use Case';

    constructor(
      private readonly leadRepository: LeadRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const lead = CreateLeadFactory.create(input);

      return (await this.leadRepository.insert(lead)).toJSON();
    }
  }
}
