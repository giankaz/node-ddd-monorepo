import { javascriptTypescriptReservedKeys } from '../models/javascriptTypescriptNodeReservedKeys';

export function keyValidator(prop: string, withExit = false) {
  if (!prop) {
    console.log('\x1b[1m%s\x1b[0m', ' ❗ Missing or undefined key. ❗ \n');
    if (withExit) {
      process.exit();
    }
    return false;
  }

  if (!/^[a-zA-Z?_]+$/.test(prop)) {
    console.log(
      '\x1b[1m%s\x1b[0m',
      ` ❗ This word: " ${prop} " contains space, numbers, or special characters that is not allowed. ❗ \n`,
    );
    if (withExit) {
      process.exit();
    }
    return false;
  }

  if (javascriptTypescriptReservedKeys.includes(prop.replace('?', ''))) {
    console.log(
      '\x1b[1m%s\x1b[0m',
      ` ❗ This word: " ${prop} " is a reserved javascript/typescript/nodejs key word ❗ \n`,
    );
    if (withExit) {
      process.exit();
    }
    return false;
  }

  return true;
}
