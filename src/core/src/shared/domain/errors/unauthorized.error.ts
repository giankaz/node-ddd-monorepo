import { BaseError } from './base-error.error';
import { ErrorData } from './standardization-interface.error';

export class UnauthorizedError extends BaseError {
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

    this.name = name || 'UNAUTHORIZED ERROR';

    this.code = code || `${id}${entity}${local}30`;
  }
}
