import { BaseError } from './base-error.error';
import { ErrorData } from './standardization-interface.error';

export class LimitCapError extends BaseError {
  public quantity: number;

  constructor({
    entity,
    id,
    local,
    message,
    name,
    solution,
    quantity,
    language,
    code,
  }: ErrorData) {
    super({
      message: {
        en: `${language ? message[language] : message['en']}. ${
          language === 'en' ? 'Current limit' : 'Limite atual'
        }: ${quantity}`,
        pt: `${language ? message[language] : message['en']}. ${
          language === 'en' ? 'Current limit' : 'Limite atual'
        }: ${quantity}`,
      },
      name,
      solution,
      language,
    });

    this.name = name || 'LIMIT CAP ERROR';

    this.quantity = quantity;

    this.code = code || `${id}${entity}${local}50`;
  }
}
