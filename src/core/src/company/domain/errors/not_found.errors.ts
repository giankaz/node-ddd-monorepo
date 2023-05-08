import { AppLanguages, translate } from 'translation';
import { CoreError } from '../../../shared';

export class CompanyNotFoundErrorFactory {
  static create(language: AppLanguages) {
    return new CoreError({
      message: translate(language, 'not_found_error_message', 'company'),
      solution: translate(language, 'not_found_error_solution', 'the company'),
      statusCode: 404,
    });
  }
}
