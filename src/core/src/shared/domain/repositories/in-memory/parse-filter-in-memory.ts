import { FilterParams, FilterOperators } from '../../../domain';

import { ParseFilterInterface } from '../parse-filter';

export class ParseFilterInMemory<Fields extends string>
  implements
    ParseFilterInterface<
      ReturnType<typeof Function>[],
      Fields,
      ReturnType<typeof Function>
    >
{
  public parseArray(
    params: FilterParams<Fields>[],
  ): ReturnType<typeof Function>[] {
    return params.map(this.parse);
  }

  public parse(param: FilterParams<Fields>): ReturnType<typeof Function> {
    switch (param.type) {
      case 'operator':
        return ParseFilterOperatorsInMemory.parse(param);
      case 'string':
        return ParseFilterOperatorsInMemory.parseContains(param);
      case 'number':
        return ParseFilterOperatorsInMemory.parseEqual(param);
      case 'boolean':
        return new Function(
          'item',
          `return item.${[param.column]} === ${!!param.value}`,
        );
      case 'date':
        if (typeof param.value !== 'object') break;
        return new Function(
          'item',
          `return item.${[param.column]} >= ${param.value.start_date} && ${
            param.column
          } <= ${param.value.end_date}`,
        );
    }
    return ParseFilterOperatorsInMemory.parseContains(param);
  }
}

export class ParseFilterOperatorsInMemory {
  static parseContains<Fields extends string>(param: FilterParams<Fields>) {
    return new Function(
      'item',
      `return item.${[param.column]}.indexOf('${param.value}') > -1`,
    );
  }

  static parseNotContains<Fields extends string>(param: FilterParams<Fields>) {
    return new Function(
      'item',
      `return item.${[param.column]}.indexOf('${param.value}') === -1`,
    );
  }

  static parseEqual<Fields extends string>(param: FilterParams<Fields>) {
    return new Function(
      'item',
      `return String(item.${[param.column]}) === '${param.value}'`,
    );
  }

  static parseNotEqual<Fields extends string>(param: FilterParams<Fields>) {
    return new Function(
      'item',
      `return String(item.${[param.column]}) !== '${param.value}'`,
    );
  }

  static parseIsFilled<Fields extends string>(param: FilterParams<Fields>) {
    return new Function('item', `return !!item.${[param.column]}`);
  }

  static parseNotFilled<Fields extends string>(param: FilterParams<Fields>) {
    return new Function('item', `return !item.${[param.column]}`);
  }

  static parseHad<Fields extends string>(param: FilterParams<Fields>) {
    return new Function('item', `return !item.${[param.column]} > 0`);
  }

  static parseNotHad<Fields extends string>(param: FilterParams<Fields>) {
    return new Function('item', `return !item.${[param.column]} === 0`);
  }

  static parseIsGreaterThan<Fields extends string>(
    param: FilterParams<Fields>,
  ) {
    return new Function(
      'item',
      `return !item.${[param.column]} > ${param.value}`,
    );
  }

  static parseIsLessThan<Fields extends string>(param: FilterParams<Fields>) {
    return new Function(
      'item',
      `return !item.${[param.column]} < ${param.value}`,
    );
  }

  public static parse<Fields extends string>(
    param: FilterParams<Fields>,
  ): ReturnType<typeof Function> {
    switch (param.operator) {
      case FilterOperators.CONTAINS:
        return this.parseContains(param);
      case FilterOperators.NOT_CONTAINS:
        return this.parseNotContains(param);
      case FilterOperators.EQUAL:
        return this.parseEqual(param);
      case FilterOperators.NOT_EQUAL:
        return this.parseNotEqual(param);
      case FilterOperators.HAD:
        return this.parseHad(param);
      case FilterOperators.NOT_HAD:
        return this.parseNotHad(param);
      case FilterOperators.IS_FILLED:
        return this.parseIsFilled(param);
      case FilterOperators.IS_NOT_FILLED:
        return this.parseNotFilled(param);
      case FilterOperators.IS_GREATER_THAN:
        return this.parseIsGreaterThan(param);
      case FilterOperators.IS_LESS_THAN:
        return this.parseIsLessThan(param);
    }
  }
}
