import { AppLanguages, Translations, translate } from 'translation';
import { errorLogger } from '../../utils';
import { Event } from '../events';
import { CoreError } from '../../domain';

export interface UseCaseOptions {
  language: AppLanguages;
  silent?: boolean;
}
export abstract class DefaultUseCase<Input, Output> {
  abstract useCase(input: Input, options?: UseCaseOptions): Promise<Output>;
  abstract context: string;

  public eventGenerated: Event<Output>;

  public async execute(
    input: Input,
    options?: UseCaseOptions,
  ): Promise<Output> {
    options = {
      ...options,
      language: options?.language || 'en',
    };

    try {
      const output = await this.useCase(input, options);

      this.eventGenerated = new Event<Output>({
        data: output,
        message_context: this.context,
      });

      return output;
    } catch (err) {
      const location = new Error()?.stack
        ?.split('at ')[3]
        ?.trim()
        ?.replace('async', '');

      let message = err?.message || '';
      let solution = err?.solution || '';
      const statusCode = err?.statusCode || 400;

      const translationsArray = Object.values(Translations);

      const translationPattern = new RegExp(translationsArray.join('|'), 'g');

      if (translationPattern.test(message)) {
        message = message.replace(
          translationPattern,
          (match: keyof typeof Translations) => {
            return translate(
              options.language,
              match,
              translate(options.language, err?.context),
            );
          },
        );
      }

      if (translationPattern.test(solution)) {
        solution = solution.replace(
          translationPattern,
          (match: keyof typeof Translations) => {
            return translate(
              options.language,
              match,
              translate(options.language, err?.context),
            );
          },
        );
      }

      if (!options?.silent || process.env.NODE_ENV !== 'test') {
        errorLogger({
          context: this.context,
          location,
          message,
          solution,
          err,
        });
      }

      throw new CoreError({
        message,
        solution,
        statusCode,
        context: this.context,
      });
    }
  }
}
