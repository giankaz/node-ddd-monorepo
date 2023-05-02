import { AppLanguages } from 'translation';
import { CoreError } from '../../domain/errors';
import { errorLogger } from '../../utils';

export interface UseCaseOptions {
  language: AppLanguages;
}
export abstract class DefaultUseCase<Input, Output> {
  protected abstract useCase(
    input: Input,
    options?: UseCaseOptions,
  ): Promise<Output>;
  abstract context: string;

  public async execute(
    input: Input,
    options?: UseCaseOptions,
  ): Promise<Output> {
    options = {
      language: options?.language || 'en',
    };

    try {
      return await this.useCase(input, options);
    } catch (err) {
      const location = new Error().stack
        .split('at ')[3]
        .trim()
        .replace('async', '');

      errorLogger({
        context: this.context,
        location,
        err,
      });

      throw err;
    }
  }
}
