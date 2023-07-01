import { Props } from '../interfaces/props';

export function loopNestedObject(obj: Props, callback: (key: string) => void) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      loopNestedObject(obj[key] as Props, callback); // recursively call the function for nested objects
    } else {
      callback(key);
    }
  }
}
