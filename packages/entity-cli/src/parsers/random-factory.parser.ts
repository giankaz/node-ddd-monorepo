import { IParser } from '../interfaces/parser';
import { Props } from '../interfaces/props';
import { PropsTypes } from '../interfaces/types';

export class RandomFactoryParser implements IParser<string> {
  execute(props: Props): string {
    let newType = ``;

    Object.entries(props).forEach(([subKey, value]) => {
      const parseKey = subKey.replace('?', '').replace('[]', '');
      if (typeof value === 'object') {
        newType += `${parseKey}: { `;
        newType += this.execute(value);
        newType += `},`;
      } else {
        newType += this.parseRandomSwitchCase(parseKey, value as PropsTypes);
      }
    });

    return newType;
  }

  private parseRandomSwitchCase(key: string, type: PropsTypes) {
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
}
