import { DefaultUseCase, UseCaseOptions } from '../';
import { languages } from 'translation';
import { CoreError } from '../../../domain';
namespace MockUseCase {
  type Input = {
    id: string;
    name: string;
    isThrow?: boolean;
  };

  type Output = Input;

  export class UseCase extends DefaultUseCase<Input, Output> {
    context = 'Mock Use Case';

    async useCase(input: Input, options: UseCaseOptions): Promise<Output> {
      if (input.isThrow)
        throw new CoreError({
          message: languages[options.language].sent,
          solution: languages[options.language].sent,
        });
      return {
        id: input.id,
        name: input.name,
      };
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
    const mockInput = { id: 'teste', name: 'teste', isThrow: true };

    expect(async () => {
      await useCase.execute(mockInput, {
        silent: true,
        language: 'en',
      });
    }).rejects.toThrowError(
      new CoreError({
        message: languages.en.sent,
        solution: languages.en.sent,
      }),
    );

    expect(async () => {
      await useCase.execute(mockInput, {
        language: 'pt',
        silent: true,
      });
    }).rejects.toThrowError(
      new CoreError({
        message: languages.pt.sent,
        solution: languages.pt.sent,
      }),
    );
  });
});
