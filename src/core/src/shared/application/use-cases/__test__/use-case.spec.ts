import { DefaultUseCase, IDefaultUseCase } from '../';

namespace MockUseCase {
  type Input = {
    id: string;
    name: string;
  };

  type Output = Input;

  export class UseCase
    extends DefaultUseCase<Output>
    implements IDefaultUseCase<Input, Output>
  {
    constructor() {
      super();
    }

    public async execute(input: Input, isThrow = false) {
      return await this.errorHandler({
        context: 'Mock Use Case Execute Function',
        executeFunction: async () => {
          if (isThrow) throw new Error('123123');
          return {
            id: input.id,
            name: input.name,
          };
        },
      });
    }
  }
}

describe('UseCase Unit Tests', () => {
  let useCase: MockUseCase.UseCase;

  beforeEach(() => {
    useCase = new MockUseCase.UseCase();
  });
  it('should run the method execute', async () => {
    const mockInput = { id: 'teste', name: 'teste' };

    const output = await useCase.execute(mockInput);
    expect(output).toStrictEqual(mockInput);
  });

  it('should catch the error', async () => {
    const mockInput = { id: 'teste', name: 'teste' };

    expect(async () => {
      await useCase.execute(mockInput, true);
    }).rejects.toThrowError(new Error('123123'));
  });
});
