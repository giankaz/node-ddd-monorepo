import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { InvalidUuidError } from '../errors';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError({
        entity: 'NE',
        id: '00',
        local: '00',
        message: {
          en: 'invalid UUID',
          pt: 'uuid inválido',
        },
        name: 'INVALID UUID',
        solution: {
          en: 'an invalid uuid was passed, call support for help',
          pt: 'um uuid inválido foi passado, chame o suporte para auxílio',
        },
      });
    }
  }
}
