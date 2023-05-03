import { DefaultUseCase } from '../../../../shared';
import { ActivityRepositoryInterface } from '../../../domain';
import { IActivity, IPartialActivity } from '../../dto';

export namespace UpdateActivityUseCase {
  export type Input = {
    id: string;
  } & IPartialActivity;

  export type Output = IActivity;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Activity Use Case';

    constructor(
      private readonly activityRepository: ActivityRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const entity = await this.activityRepository.findById(input.id);

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

      return await this.activityRepository.update(entity);
    }
  }
}
