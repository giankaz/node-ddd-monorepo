import { BaseError } from './base-error.error';
import { ErrorData } from './standardization-interface.error';

export class DeniedError extends BaseError {
  constructor({
    entity,
    id,
    local,
    message,
    name,
    solution,
    language,
    code,
  }: ErrorData) {
    super({
      message,
      name,
      solution,
      language,
    });

    this.name = name || 'DENIED ERROR';

    this.code = code || `${id}${entity}${local}40`;
  }
}
