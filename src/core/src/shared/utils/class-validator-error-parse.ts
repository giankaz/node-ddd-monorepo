import { FieldsErrors } from '../domain';

export function classValidatorErrorParse(error: FieldsErrors) {
  let messages = '';
  for (const key in error) {
    if (error[key]) {
      error[key].forEach((err) => {
        messages += ` ${err},`;
      });
    }
  }

  return messages.trim().slice(0, -1) + '.';
}
