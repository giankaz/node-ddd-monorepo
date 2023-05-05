import { DefaultUseCase } from '../../../../shared';
import { ExampleRepositoryInterface } from '../../../domain';
import { IExample, IPartialExample } from '../../dto';

export namespace UpdateExampleUseCase {
  export type Input = {
    id: string;
  } & IPartialExample;

  export type Output = IExample;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Update Example Use Case';

    constructor(
      private readonly exampleRepository: ExampleRepositoryInterface.Repository,
    ) {
      super();
    }

    public async useCase(input: Input): Promise<Output> {
      const entity = await this.exampleRepository.findById(input.id);

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

      return await this.exampleRepository.update(entity);
    }
  }
}
