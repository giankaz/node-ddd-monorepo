import { CoreError } from '../core-error.error';

describe('ConfigurationError Test', () => {
  test('it should throw error', () => {
    expect(() => {
      throw new CoreError({
        message: 'msg',
        solution: 'msg',
      });
    }).toThrowError(
      new CoreError({
        message: 'msg',
        solution: 'msg',
      }),
    );
  });
});
