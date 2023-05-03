export interface FilterParams {
  type: 'string' | 'number' | 'date' | 'boolean' | 'operator';
  column: string;
  operator: FilterOperators;
  value: IFilterDateValue | string | boolean | number;
}

export enum FilterOperators {
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  IS_FILLED = 'IS_FILLED',
  IS_NOT_FILLED = 'IS_NOT_FILLED',
  HAD = 'HAD',
  NOT_HAD = 'NOT_HAD',
  IS_GREATER_THAN = 'IS_GREATER_THAN',
  IS_LESS_THAN = 'IS_LESS_THAN',
}

export interface IFilterDateValue {
  start_date: Date;
  end_date: Date;
}
