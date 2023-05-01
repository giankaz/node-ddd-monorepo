import { ConfigurationError } from '../configuration.error';

describe('ConfigurationError Test', () => {
  test('it should throw error', () => {
    expect(() => {
      throw new ConfigurationError({
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
      new ConfigurationError({
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
