export interface ICommand {
  execute(...args: unknown[]): void;
}
