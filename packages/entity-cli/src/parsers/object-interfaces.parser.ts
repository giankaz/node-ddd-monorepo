import { IParser } from '../interfaces/parser';
import { Props } from '../interfaces/props';

interface ObjectInterfacesExecute {
  props: Props;
  interfaceName: string;
  entityName: string;
}
export class ObjectInterfacesParser implements IParser<string> {
  execute({
    interfaceName,
    entityName,
    props,
  }: ObjectInterfacesExecute): string {
    let result = `export interface ${
      entityName.charAt(0).toUpperCase() + entityName.slice(1)
    }${interfaceName} { \n`;

    const entriesProps = Object.entries(props);

    entriesProps.forEach(([key, value], index) => {
      if (typeof value === 'object') {
        const parsedKey = (key.charAt(0).toUpperCase() + key.slice(1))
          .replace('?', '')
          .replace('[]', '');
        result += ` ${key}: ${
          entityName.charAt(0).toUpperCase() + entityName.slice(1)
        }${interfaceName}${parsedKey} \n`;
        if (index === entriesProps.length - 1) {
          result += ' }\n\n';
        }

        result += this.execute({
          props: value,
          interfaceName: interfaceName + parsedKey,
          entityName,
        });
      } else {
        result += ` ${key}: ${value} \n`;
        if (index === entriesProps.length - 1) {
          result += ' }\n\n';
        }
      }
    });

    return result;
  }
}
