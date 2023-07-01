import { debug, error } from 'console';

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
  const ctx = `
${bars}

${msg}

${dateString}

${bars}

${`Message:`}

${message}

${`Solution:`}

${solution}

${`Error Location:`}
    
${location}

${bars}

`;
  debug(ctx);
  debug('StackTrace:\n\n');
  error(err);
  debug(ctx);
}
