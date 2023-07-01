import { IParser } from '../interfaces/parser';

interface GetterSetterReturn {
  setter: string;
  getter: string;
}

interface GetterSetterExecute {
  parsedKey: string;
  parsedType: string;
  keyUppercaseFirstParsed: string;
  isOptional: boolean;
  validation: string;
}

export class GetterSetterParser implements IParser<GetterSetterReturn> {
  public execute({
    keyUppercaseFirstParsed,
    parsedKey,
    parsedType,
    isOptional,
    validation,
  }: GetterSetterExecute): GetterSetterReturn {
    let getter = `get ${parsedKey}(): ${parsedType}{ return this.props.${parsedKey}};\n\n`;

    if (isOptional) {
      getter = `get ${parsedKey}():${parsedType}{ return this.props?.${parsedKey}};\n\n`;
    }

    let setter = `public change${keyUppercaseFirstParsed}(new${keyUppercaseFirstParsed}: ${parsedType}){ 
          this.props.${parsedKey}= ${
      validation === 'Date'
        ? `new Date(new${keyUppercaseFirstParsed})`
        : `new${keyUppercaseFirstParsed}`
    };
          this.update()
        };\n`;

    if (isOptional) {
      setter = `public change${keyUppercaseFirstParsed}(new${keyUppercaseFirstParsed}:${parsedType}|null){
            this.props.${parsedKey}= ${
        validation === 'Date'
          ? `new Date(new${keyUppercaseFirstParsed})`
          : `new${keyUppercaseFirstParsed}`
      };
            this.update()
          };\n`;
    }

    return {
      getter,
      setter,
    };
  }
}
