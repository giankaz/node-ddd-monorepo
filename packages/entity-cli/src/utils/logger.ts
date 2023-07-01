import { log as systemLog } from 'console';

export function boldLog(message?: unknown, ...optionalParams: unknown[]) {
  systemLog('\x1b[1m%s\x1b[0m', message, ...optionalParams);
}
