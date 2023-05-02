import { debug, error } from 'console';
import kleur from 'kleur';

interface IErrorLogger {
  location: string;
  context: string;
  err: unknown;
}

export function errorLogger({ context, location, err }: IErrorLogger) {
  const dateString = new Date().toLocaleString();
  const msg = `Error: ${context}`;
  const bars = '*'.repeat(msg.length * 2);
  const spaces = ' '.repeat(msg.length / 2);
  const dateSpaces = ' '.repeat((bars.length - dateString.length) / 2);
  const ctx = kleur.red(
    `\n${bars}\n\n${spaces}${msg}${spaces}\n\n${dateSpaces}${dateString}${dateSpaces}\n\n${bars}\n\n${kleur.underline(
      `Error Location:`,
    )}\n\n${location}\n\n`,
  );
  debug(ctx);
  debug(kleur.underline().magenta('StackTrace:\n\n'));
  error(err);
  debug(ctx);
}
