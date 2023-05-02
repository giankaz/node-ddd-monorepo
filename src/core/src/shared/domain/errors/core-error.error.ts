interface ErrorData {
  solution: string;
  msg: string;
}

export class CoreError extends Error {
  public solution: string;
  public msg: string;

  constructor({ msg, solution }: ErrorData) {
    super(msg);

    this.solution = solution;
  }
}
