import { IParser } from '../interfaces/parser';
import { Props } from '../interfaces/props';

interface DtoParserExecute {
  props: Props;
  name: string;
}

export class DtoParser implements IParser<string> {
  execute({ name, props }: DtoParserExecute): string {
    let newType = ``;

    Object.entries(props).forEach(([subKey, value]) => {
      if (typeof value === 'object') {
        newType += `${subKey}: vo.${
          name.charAt(0).toUpperCase() + name.slice(1)
        }${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`;
      } else {
        newType += `${subKey}: ${value};\n\n`;
      }
    });

    return newType;
  }
}
