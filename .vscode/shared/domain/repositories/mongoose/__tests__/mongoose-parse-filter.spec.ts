import { FilterParams } from '../../../../domain';
import {
  MongooseParseFilter,
  MongooseParseFilterOperators,
} from '../mongoose-parse-filter';

describe('Test mongoose Parse filter', () => {
  it('should be successful if the operator is CONTAINS', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'CONTAINS',
      value: 'teste',
    } as FilterParams;

    const parseFilter = new MongooseParseFilter();
    expect(parseFilter.parse(params)).toBeDefined();
  });

  it('should be successful if the type is Boolean', () => {
    const params = {
      type: 'boolean',
      column: 'name',
      operator: 'CONTAINS',
      value: 'teste',
    } as FilterParams;

    const parseFilter = new MongooseParseFilter();
    expect(parseFilter.parse(params)).toBeDefined();
  });

  it('should be successful if the type is Date', () => {
    const params = {
      type: 'date',
      column: 'name',
      operator: 'CONTAINS',
      value: {
        name: 'name',
      },
    };
    const parseFilter = new MongooseParseFilter();
    //@ts-expect-error value of the type object
    expect(parseFilter.parse(params)).toBeDefined();
  });
});

describe('Parse Filter Operator Tests', () => {
  it('should be successful returning the expected function for operator: CONTAINS.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'CONTAINS',
      value: 'test',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: /test/i,
    });
  });

  it('should be successful returning the expected function for operator: NOT_CONTAINS.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'NOT_CONTAINS',
      value: 'test',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: {
        $not: /test/i,
      },
    });
  });

  it('should be successful returning the expected function for operator: EQUAL.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'EQUAL',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: 'teste',
    });
  });

  it('should be successful returning the expected function for operator: NOT_EQUAL.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'NOT_EQUAL',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: {
        $ne: 'teste',
      },
    });
  });

  it('should be successful returning the expected function for operator: HAD.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'HAD',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: {
        $gt: 0,
      },
    });
  });

  it('should be successful returning the expected function for operator: NOT_HAD.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'NOT_HAD',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: 0,
    });
  });

  it('should be successful returning the expected function for operator: IS_FILLED.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_FILLED',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: {
        $ne: null,
      },
    });
  });

  it('should be successful returning the expected function for operator: IS_NOT_FILLED.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_NOT_FILLED',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: null,
    });
  });

  it('should be successful returning the expected function for operator: IS_GREATER_THAN.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_GREATER_THAN',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: {
        $gt: 'teste',
      },
    });
  });
  it('should be successful returning the expected function for operator: IS_LESS_THAN.', () => {
    const params = {
      type: 'operator',
      column: 'name',
      operator: 'IS_LESS_THAN',
      value: 'teste',
    } as FilterParams;
    const test = MongooseParseFilterOperators.parse(params);
    expect(test).toStrictEqual({
      name: {
        $lt: 'teste',
      },
    });
  });
});
