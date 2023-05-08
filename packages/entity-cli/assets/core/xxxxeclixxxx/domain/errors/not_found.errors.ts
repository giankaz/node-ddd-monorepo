import { AppLanguages, translate } from 'translation';
import { CoreError } from '../../../shared';

export class XxxxeclixxxxNotFoundErrorFactory {
  static create(language: AppLanguages) {
    return new CoreError({
      message: translate(language, 'not_found_error_message', 'xxxxeclixxxx'),
      solution: translate(
        language,
        'not_found_error_solution',
        'the xxxxeclixxxx',
      ),
      statusCode: 404,
    });
  }
}
