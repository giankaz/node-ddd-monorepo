import { javascriptTypescriptReservedKeys } from '../constants/reserved-keys';
import { Props } from '../interfaces/props';
import { boldLog } from './logger';

export function keyValidator(prop: string, props?: Props, withExit = false) {
  if (!prop) {
    boldLog(' ❗ Missing or undefined key. ❗ \n');
    if (withExit) {
      process.exit();
    }
    return false;
  }

  if (!/^[a-zA-Z?_]+$/.test(prop)) {
    boldLog(
      ` ❗ This word: " ${prop} " contains space, numbers, or special characters that is not allowed. ❗ \n`,
    );

    if (withExit) {
      process.exit();
    }
    return false;
  }

  if (javascriptTypescriptReservedKeys.includes(prop.replace('?', ''))) {
    boldLog(
      ` ❗ This word: " ${prop} " is a reserved javascript/typescript/nodejs key word ❗ \n`,
    );
    if (withExit) {
      process.exit();
    }
    return false;
  }

  if (!!props && prop in props) {
    boldLog(` ❗ This word: " ${prop} " is already on your entity ❗ \n`);
    if (withExit) {
      process.exit();
    }
    return false;
  }

  return true;
}
