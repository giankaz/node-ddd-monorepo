import { DefaultUseCase } from '../../../../shared';
import { ActivityRepositoryInterface } from '../../../domain';

export namespace SoftDeleteActivityUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Soft Delete Activity Use Case';

    constructor(
      private readonly activityRepository: ActivityRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.activityRepository.softDelete(input.id);
      return;
    }
  }
}
