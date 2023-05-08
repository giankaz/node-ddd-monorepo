import { FilterOperators } from 'core';

enum AscOrDesc {
  ASC = 'asc',
  DESC = 'desc',
}

enum FilterType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  OPERATOR = 'operator',
}

export class FilterParamsDto {
  type: FilterType;

  column: string;

  operator: FilterOperators;

  value: string;
}

export class ListQueryDto {
  page?: number;

  per_page?: number;

  sort?: string;

  sort_dir?: AscOrDesc;

  search?: string;

  filter?: FilterParamsDto[];
}
