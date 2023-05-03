import { DefaultUseCase } from '../../../../shared';
import { LeadRepositoryInterface } from '../../../domain';
import { ILead } from '../../dto';

export namespace FindByIdLeadUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ILead;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Lead Use Case';

    constructor(
      private readonly leadRepository: LeadRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      return (await this.leadRepository.findById(input.id)).toJSON();
    }
  }
}
