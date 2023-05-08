import { Props } from '../models/props';

export function parseDto(props: Props) {
  let newType = ``;

  Object.entries(props).forEach(([subkey, value]) => {
    if (typeof value === 'object') {
      newType += `${subkey}: { \n`;
      newType += parseDto(value);
      newType += `}\n\n`;
    } else {
      newType += `${subkey}: ${value};\n\n`;
    }
  });

  return newType;
}
