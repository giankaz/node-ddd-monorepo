import { FieldsErrors } from '../validators';
import { classValidatorErrorParse } from '../../utils';
import { BaseError } from './base-error.error';
import { ErrorData } from './standardization-interface.error';

export class ValidationError extends BaseError {
  constructor({
    entity,
    id,
    local,
    message,
    name,
    solution,
    code,
    language,
  }: ErrorData) {
    super({
      message,
      name,
      solution,
      language,
    });

    this.name = name || 'VALIDATION ERROR';

    this.code = code ? code : `${id}${entity}${local}10`;
  }
}

export class EntityValidationError extends BaseError {
  constructor(
    public error: FieldsErrors | null,
    { entity, id, local, message, name, solution, language }: ErrorData,
  ) {
    const messages = classValidatorErrorParse(error);

    super({
      message: {
        en:
          messages.length > 0
            ? `${message.en} ${messages}`
            : 'entity validation error',
        pt:
          messages.length > 0
            ? `${message.pt} ${messages}`
            : 'entity validation error',
      },
      name,
      solution,
      language,
    });

    this.name = name || 'ENTITY VALIDATION ERROR';

    this.code = `${id}${entity}${local}10`;
  }
}

export class InvalidUuidError extends BaseError {
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
      message: {
        en: message.en || 'id must be a valid uuid',
        pt: message.pt || 'id deve ser um uuid válido',
      },
      name,
      solution,
      language,
    });

    this.name = name || 'INVALID UUID ERROR';

    this.code = code || `${id}${entity}${local}10`;
  }
}
