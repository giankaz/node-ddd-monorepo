import { FilterParams, FilterOperators } from '../../../domain';

import { ParseFilterInterface } from '../parse-filter';

export class ParseFilterInMemory
  implements
    ParseFilterInterface<
      ReturnType<typeof Function>[],
      ReturnType<typeof Function>
    >
{
  public parseArray(params: FilterParams[]): ReturnType<typeof Function>[] {
    return params.map(this.parse);
  }

  public parse(param: FilterParams): ReturnType<typeof Function> {
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
  static parseContains(param: FilterParams) {
    return new Function(
      'item',
      `return item.${[param.column]}.indexOf('${param.value}') > -1`,
    );
  }

  static parseNotContains(param: FilterParams) {
    return new Function(
      'item',
      `return item.${[param.column]}.indexOf('${param.value}') === -1`,
    );
  }

  static parseEqual(param: FilterParams) {
    return new Function(
      'item',
      `return item.${[param.column]} === ${param.value}`,
    );
  }

  static parseNotEqual(param: FilterParams) {
    return new Function(
      'item',
      `return item.${[param.column]} !== ${param.value}`,
    );
  }

  static parseIsFilled(param: FilterParams) {
    return new Function('item', `return !!item.${[param.column]}`);
  }

  static parseNotFilled(param: FilterParams) {
    return new Function('item', `return !item.${[param.column]}`);
  }

  static parseHad(param: FilterParams) {
    return new Function('item', `return !item.${[param.column]} > 0`);
  }

  static parseNotHad(param: FilterParams) {
    return new Function('item', `return !item.${[param.column]} === 0`);
  }

  static parseIsGreaterThan(param: FilterParams) {
    return new Function(
      'item',
      `return !item.${[param.column]} > ${param.value}`,
    );
  }

  static parseIsLessThan(param: FilterParams) {
    return new Function(
      'item',
      `return !item.${[param.column]} < ${param.value}`,
    );
  }

  public static parse(param: FilterParams): ReturnType<typeof Function> {
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
