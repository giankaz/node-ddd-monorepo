import { FilterParams, FilterOperators, ParseFilterInterface } from '../..';

interface IFilterOperatorReturn {
  [key: string]: unknown;
}

export class MongooseParseFilter<Fields extends string>
  implements ParseFilterInterface<IFilterOperatorReturn, Fields>
{
  public parseArray<Fields extends string>(params: FilterParams<Fields>[]) {
    const items = params.map(this.parse).reduce((acc, cur) => {
      for (const key in cur) {
        if (!acc[key]) {
          acc = { ...acc, [key]: cur[key] };
          return acc;
        }

        if (acc[key] && !Array.isArray(acc[key])) {
          acc = { ...acc, [key]: [acc[key], cur[key]] };
          return acc;
        }

        if (acc[key] && Array.isArray(acc[key])) {
          acc = { ...acc, [key]: [...(acc[key] as []), cur[key]] };
          return acc;
        }
      }
      return acc;
    }, {} as IFilterOperatorReturn);
    return items;
  }

  public parse<Fields extends string>(param: FilterParams<Fields>) {
    if (param.column === 'id') {
      param.column = '_id' as Fields;
    }

    switch (param.type) {
      case 'operator':
        return MongooseParseFilterOperators.parse<Fields>(param);
      case 'string':
        return MongooseParseFilterOperators.parseContains<Fields>(param);
      case 'boolean':
        return { [param.column]: !!param.value };
      case 'date':
        if (typeof param.value !== 'object') break;
        return {
          [param.column]: {
            $gte: param.value.start_date,
            $lte: param.value.end_date,
          },
        };
    }
    return MongooseParseFilterOperators.parse<Fields>(param);
  }
}

export class MongooseParseFilterOperators {
  static parseContains<Fields extends string>(
    param: Pick<FilterParams<Fields>, 'column' | 'value'>,
  ): IFilterOperatorReturn {
    return { [param.column as string]: new RegExp(`${param.value}`, 'i') };
  }
  static parseNotContains<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: { $not: new RegExp(`${param.value}`, 'i') } };
  }
  static parseEqual<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: param.value };
  }
  static parseNotEqual<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: { $ne: param.value } };
  }
  static parseIsFilled<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: { $ne: null } };
  }
  static parseNotFilled<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: null };
  }
  static parseHad<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: { $gt: 0 } };
  }
  static parseNotHad<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: 0 };
  }
  static parseIsGreaterThan<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: { $gt: param.value } };
  }

  static parseIsLessThan<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    return { [param.column]: { $lt: param.value } };
  }

  public static parse<Fields extends string>(
    param: FilterParams<Fields>,
  ): IFilterOperatorReturn {
    switch (param.operator) {
      case FilterOperators.CONTAINS:
        return this.parseContains<Fields>(param);
      case FilterOperators.NOT_CONTAINS:
        return this.parseNotContains<Fields>(param);
      case FilterOperators.EQUAL:
        return this.parseEqual<Fields>(param);
      case FilterOperators.NOT_EQUAL:
        return this.parseNotEqual<Fields>(param);
      case FilterOperators.HAD:
        return this.parseHad<Fields>(param);
      case FilterOperators.NOT_HAD:
        return this.parseNotHad<Fields>(param);
      case FilterOperators.IS_FILLED:
        return this.parseIsFilled<Fields>(param);
      case FilterOperators.IS_NOT_FILLED:
        return this.parseNotFilled<Fields>(param);
      case FilterOperators.IS_GREATER_THAN:
        return this.parseIsGreaterThan<Fields>(param);
      case FilterOperators.IS_LESS_THAN:
        return this.parseIsLessThan<Fields>(param);
    }
  }
}
