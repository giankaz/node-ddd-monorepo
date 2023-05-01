import { BaseError } from './base-error.error';
import { ErrorData } from './standardization-interface.error';

export class NotFoundError extends BaseError {
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

    this.name = name || 'NOT FOUND ERROR';

    this.code = code || `${id}${entity}${local}20`;
  }
}
