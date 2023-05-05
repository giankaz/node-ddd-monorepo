import { Props } from '../models/props';
import { PropsTypes } from '../models/types';

export function parseRandom(props: Props) {
  let newType = ``;

  Object.entries(props).forEach(([subkey, value]) => {
    const parseKey = subkey.replace('?', '').replace('[]', '');
    if (typeof value === 'object') {
      newType += `${parseKey}: { `;
      newType += parseRandom(value);
      newType += `},`;
    } else {
      newType += parseRandomSwitchCase(parseKey, value as PropsTypes);
    }
  });

  return newType;
}

export function parseRandomSwitchCase(key: string, type: PropsTypes) {
  let newType = `${key}: `;

  switch (type) {
    case 'string':
      newType += 'uuid(),';
      break;
    case 'number':
      newType += 'Math.floor(Math.random() * 101),';
      break;
    case 'string[]':
      newType += '[uuid()],';
      break;
    case 'number[]':
      newType += '[1, 2, 3],';
      break;
    case 'boolean':
      newType += 'true, ';
      break;
    case 'Date':
      newType += 'new Date(),';
      break;
  }

  return newType;
}
