export interface IHandler {
  handle(...data: unknown[]): void;
}
