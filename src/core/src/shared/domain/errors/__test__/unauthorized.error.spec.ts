import { UnauthorizedError } from '../unauthorized.error';

describe('UnauthorizedError Test', () => {
  test('it should throw error', () => {
    expect(() => {
      throw new UnauthorizedError({
        message: {
          en: 'message',
          pt: 'message',
        },
        entity: 'NE',
        id: '00',
        local: '10',
        name: 'NAME',
        solution: {
          en: 'teste',
          pt: 'teste',
        },
      });
    }).toThrowError(
      new UnauthorizedError({
        message: {
          en: 'message',
          pt: 'message',
        },
        entity: 'NE',
        id: '00',
        local: '10',
        name: 'NAME',
        solution: {
          en: 'teste',
          pt: 'teste',
        },
      }),
    );
  });
});
