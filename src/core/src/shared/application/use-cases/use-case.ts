import { error, debug } from 'console';
import kleur from 'kleur';

export interface IDefaultUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

interface ErrorHandler<Output> {
  context: string;
  executeFunction: () => Promise<Output>;
}

export abstract class DefaultUseCase<Output> {
  public async errorHandler({
    context,
    executeFunction,
  }: ErrorHandler<Output>): Promise<Output> {
    try {
      return await executeFunction();
    } catch (err) {
      const dateString = new Date().toLocaleString();
      const msg = `Error: ${context}`;
      const bars = '*'.repeat(msg.length * 2);
      const spaces = ' '.repeat(msg.length / 2);
      const dateSpaces = ' '.repeat((bars.length - dateString.length) / 2);
      const ctx = kleur.red(
        `\n${bars}\n\n${spaces}${msg}${spaces}\n\n${dateSpaces}${dateString}${dateSpaces}\n\n${bars}\n\n`,
      );
      debug(ctx);
      error(err);
      debug(ctx);
      throw new Error((err as Error)?.message);
    }
  }
}
