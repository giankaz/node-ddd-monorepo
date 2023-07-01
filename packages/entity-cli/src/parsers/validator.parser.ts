import { IParser } from '../interfaces/parser';

interface ValidatorExecute {
  isArray: boolean;
  isNumber: boolean;
  isObject: boolean;
  isOptional: boolean;
  message: string;
  validation: string;
  key: string;
  parsedType: string;
}

export class ValidatorParser implements IParser<string> {
  public execute({
    isArray,
    isNumber,
    isObject,
    isOptional,
    message,
    validation,
    key,
    parsedType,
  }: ValidatorExecute): string {
    let validator = `@classValidator.Is${validation}(${
      isArray
        ? isNumber || isObject
          ? `{} , { each: true, ${message} }`
          : `{ each: true, ${message} }`
        : isNumber || isObject
        ? `{}, { ${message} }`
        : `{ ${message} }`
    })\n ${key}:${parsedType}; \n\n`;

    if (isOptional) {
      validator = `@classValidator.Is${validation}(${
        isArray
          ? isNumber || isObject
            ? `{} , { each: true, ${message} }`
            : `{ each: true, { ${message} }`
          : isNumber || isObject
          ? `{}, { ${message} }`
          : `{ ${message} }`
      })\n @classValidator.IsOptional() \n ${key}: ${parsedType};\n\n`;
    }

    return validator;
  }
}
