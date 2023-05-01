import { EntityValidationError, ValidationError } from '../validation.error';

describe('NotFoundError Test', () => {
  test('it should throw validation error', () => {
    expect(() => {
      throw new ValidationError({
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
      new ValidationError({
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

  test('it should throw entity validation error', () => {
    expect(() => {
      throw new EntityValidationError(
        {},
        {
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
        },
      );
    }).toThrowError(
      new EntityValidationError(
        {},
        {
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
        },
      ),
    );
  });
});
