import { Props } from '../models/props';

export function parseObjectInterfaces(
  props: Props,
  interfaceName: string,
  name: string,
) {
  let result = `export interface ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }${interfaceName} { \n`;

  const entriesProps = Object.entries(props);

  entriesProps.forEach(([key, value], index) => {
    if (typeof value === 'object') {
      const parsedKey = (key.charAt(0).toUpperCase() + key.slice(1))
        .replace('?', '')
        .replace('[]', '');
      result += ` ${key}: ${
        name.charAt(0).toUpperCase() + name.slice(1)
      }${interfaceName}${parsedKey} \n`;
      if (index === entriesProps.length - 1) {
        result += ' }\n\n';
      }

      result += parseObjectInterfaces(value, interfaceName + parsedKey, name);
    } else {
      result += ` ${key}: ${value} \n`;
      if (index === entriesProps.length - 1) {
        result += ' }\n\n';
      }
    }
  });

  return result;
}
