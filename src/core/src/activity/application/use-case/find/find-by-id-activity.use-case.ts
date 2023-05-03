import { DefaultUseCase } from '../../../../shared';
import { ActivityRepositoryInterface } from '../../../domain';
import { IActivity } from '../../dto';

export namespace FindByIdActivityUseCase {
  export type Input = {
    id: string;
  };

  export type Output = IActivity;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Find By Id Activity Use Case';

    constructor(
      private readonly activityRepository: ActivityRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      return (await this.activityRepository.findById(input.id)).toJSON();
    }
  }
}
