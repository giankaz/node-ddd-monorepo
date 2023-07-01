import { FilterParams } from '..';

export interface ParseFilterInterface<
  ParseArray,
  Fields extends string,
  Parse = ParseArray,
> {
  parseArray(params: FilterParams<Fields>[]): ParseArray;
  parse(param: FilterParams<Fields>): Parse;
}
