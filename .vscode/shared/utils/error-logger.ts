import { debug, error } from 'console';
import kleur from 'kleur';

interface IErrorLogger {
  location: string;
  context: string;
  err: unknown;
  message: string;
  solution: string;
}

export function errorLogger({
  context,
  location,
  err,
  message,
  solution,
}: IErrorLogger) {
  const size = 60;

  const dateString = new Date().toLocaleString();
  const msg = `Error: ${context}`;
  const bars = '*'.repeat(size);
  const ctx = kleur.red(
    `
${bars}

${kleur.underline(msg)}

${dateString}

${bars}

${kleur.underline(`Message:`)}

${message}

${kleur.underline(`Solution:`)}

${solution}

${kleur.underline(`Error Location:`)}
    
${location}

${bars}

`,
  );
  debug(ctx);
  debug(kleur.underline().magenta('StackTrace:\n\n'));
  error(err);
  debug(ctx);
}
