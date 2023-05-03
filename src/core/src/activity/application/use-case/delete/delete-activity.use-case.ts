import { DefaultUseCase } from '../../../../shared';
import { ActivityRepositoryInterface } from '../../../domain';

export namespace DeleteActivityUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Delete Activity Use Case';

    constructor(
      private readonly activityRepository: ActivityRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      await this.activityRepository.delete(input.id);
      return;
    }
  }
}
