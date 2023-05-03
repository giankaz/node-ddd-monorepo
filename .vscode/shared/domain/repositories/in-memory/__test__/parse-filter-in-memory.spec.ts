import { FilterParams, FilterOperators } from '../../../../domain';
import { ParseFilterInMemory, ParseFilterOperatorsInMemory } from '../../';

describe('Parse filter in memory test', () => {
  it('should be successful if the operator is CONTAINS', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'CONTAINS',
      value: 'teste',
    } as FilterParams;

    const parseFilter = new ParseFilterInMemory();
    expect(parseFilter.parse(params)).toBeDefined();
  });

  it('should be successful if the type is Boolean', () => {
    const params = {
      type: 'boolean',
      column: 'name',
      operator: 'CONTAINS',
      value: 'teste',
    } as FilterParams;

    const parseFilter = new ParseFilterInMemory();
    expect(parseFilter.parse(params)).toBeDefined();
  });

  it('should be successful if the type is Date', () => {
    const params = {
      type: 'date' as 'string' | 'number' | 'date' | 'boolean' | 'operator',
      column: 'name',
      operator: FilterOperators.CONTAINS,
      value: 'name',
    };
    const parseFilter = new ParseFilterInMemory();
    expect(parseFilter.parse(params)).toBeDefined();
  });
});

describe('Parse Filter Operator Tests', () => {
  it('should be successful returning the expected function for operator: CONTAINS.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'CONTAINS',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual("item.name.indexOf('teste') > -1");
  });

  it('should be successful returning the expected function for operator: NOT_CONTAINS.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'NOT_CONTAINS',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual("item.name.indexOf('teste') === -1");
  });

  it('should be successful returning the expected function for operator: EQUAL.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'EQUAL',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('item.name === teste');
  });

  it('should be successful returning the expected function for operator: NOT_EQUAL.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'NOT_EQUAL',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('item.name !== teste');
  });

  it('should be successful returning the expected function for operator: HAD.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'HAD',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('!item.name > 0');
  });

  it('should be successful returning the expected function for operator: NOT_HAD.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'NOT_HAD',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('!item.name === 0');
  });

  it('should be successful returning the expected function for operator: IS_FILLED.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_FILLED',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('!!item.name');
  });

  it('should be successful returning the expected function for operator: IS_NOT_FILLED.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_NOT_FILLED',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('!item.name');
  });

  it('should be successful returning the expected function for operator: IS_GREATER_THAN.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_GREATER_THAN',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('!item.name > teste');
  });
  it('should be successful returning the expected function for operator: IS_LESS_THAN.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_LESS_THAN',
      value: 'teste',
    } as FilterParams;
    const test = ParseFilterOperatorsInMemory.parse(params);
    expect(
      test.toString().split('return')[1].replace('}', '').trim(),
    ).toStrictEqual('!item.name < teste');
  });
});
