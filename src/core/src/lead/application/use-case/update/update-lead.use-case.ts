import { DefaultUseCase } from '../../../../shared';
import { LeadRepositoryInterface } from '../../../domain';
import { ILead, IPartialLead } from '../../dto';

export namespace UpdateLeadUseCase {
  export type Input = {
    id: string;
  } & IPartialLead;

  export type Output = ILead;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Lead Use Case';

    constructor(
      private readonly leadRepository: LeadRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const entity = await this.leadRepository.findById(input.id);

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

      return await this.leadRepository.update(entity);
    }
  }
}
