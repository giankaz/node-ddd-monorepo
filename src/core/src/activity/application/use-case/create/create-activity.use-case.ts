import { DefaultUseCase } from '../../../../shared';
import {
  CreateActivityFactory,
  ActivityRepositoryInterface,
} from '../../../domain';
import { ActivityInput, IActivity } from '../../dto';

export namespace CreateActivityUseCase {
  export type Input = ActivityInput;

  export type Output = IActivity;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Create Activity Use Case';

    constructor(
      private readonly activityRepository: ActivityRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const activity = CreateActivityFactory.create(input);

      return (await this.activityRepository.insert(activity)).toJSON();
    }
  }
}
