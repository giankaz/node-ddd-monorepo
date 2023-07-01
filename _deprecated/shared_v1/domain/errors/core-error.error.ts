interface ErrorData {
  solution?: string;
  statusCode?: number;
  context?: string;
  message: string;
}

export class CoreError extends Error {
  public solution: string;
  public statusCode: number;
  public context: string;
  public message: string;

  constructor({ message, solution, statusCode, context }: ErrorData) {
    super(message);

    this.message = message;
    this.context = context || '';
    this.solution = solution || '';
    this.statusCode = statusCode || 400;
  }
}
