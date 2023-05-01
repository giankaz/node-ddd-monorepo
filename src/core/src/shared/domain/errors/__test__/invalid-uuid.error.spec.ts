import { InvalidUuidError } from '../validation.error';

describe('InvalidUuidError Test', () => {
  test('it should throw error', () => {
    expect(() => {
      throw new InvalidUuidError({
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
      new InvalidUuidError({
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
