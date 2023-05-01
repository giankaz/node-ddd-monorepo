import { FilterParams } from '../../domain';

export interface ParseFilterInterface<ParseArray, Parse = ParseArray> {
  parseArray(params: FilterParams[]): ParseArray;
  parse(param: FilterParams): Parse;
}
