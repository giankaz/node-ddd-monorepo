import { DeniedError } from '../denied.error';

describe('DeniedError Test', () => {
  test('it should throw error', () => {
    expect(() => {
      throw new DeniedError({
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
      new DeniedError({
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
