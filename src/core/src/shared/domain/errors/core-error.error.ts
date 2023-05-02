interface ErrorData {
  solution: string;
  message: string;
}

export class CoreError extends Error {
  public solution: string;

  constructor({ message, solution }: ErrorData) {
    super(message);

    this.solution = solution;
  }
}
