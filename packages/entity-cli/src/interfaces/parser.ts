export interface IParser<T> {
  execute(data: unknown): T;
}
