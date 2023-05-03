import {
  FilterParams,
  FilterOperators,
  ParseFilterInterface,
} from '../../../domain';

interface IFilterOperatorReturn {
  [key: string]: unknown;
}

export class MongooseParseFilter
  implements ParseFilterInterface<IFilterOperatorReturn>
{
  public parseArray(params: FilterParams[]) {
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

  public parse(param: FilterParams) {
    if (param.column === 'id') {
      param.column = '_id';
    }

    switch (param.type) {
      case 'operator':
        return MongooseParseFilterOperators.parse(param);
      case 'string':
        return MongooseParseFilterOperators.parseContains(param);
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
    return MongooseParseFilterOperators.parse(param);
  }
}

export class MongooseParseFilterOperators {
  static parseContains(
    param: Pick<FilterParams, 'column' | 'value'>,
  ): IFilterOperatorReturn {
    return { [param.column]: new RegExp(`${param.value}`, 'i') };
  }
  static parseNotContains(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: { $not: new RegExp(`${param.value}`, 'i') } };
  }
  static parseEqual(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: param.value };
  }
  static parseNotEqual(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: { $ne: param.value } };
  }
  static parseIsFilled(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: { $ne: null } };
  }
  static parseNotFilled(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: null };
  }
  static parseHad(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: { $gt: 0 } };
  }
  static parseNotHad(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: 0 };
  }
  static parseIsGreaterThan(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: { $gt: param.value } };
  }

  static parseIsLessThan(param: FilterParams): IFilterOperatorReturn {
    return { [param.column]: { $lt: param.value } };
  }

  public static parse(param: FilterParams): IFilterOperatorReturn {
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
