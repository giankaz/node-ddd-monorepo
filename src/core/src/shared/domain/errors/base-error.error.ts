import { ErrorData } from './standardization-interface.error';

export class BaseError extends Error {
  public code: string;
  public solution: string;
  public ptMessage: string;
  public enMessage: string;
  public ptSolution: string;
  public enSolution: string;

  constructor({
    message,
    name,
    solution,
    language,
  }: Pick<ErrorData, 'solution' | 'name' | 'message' | 'language'>) {
    super(language ? message[language] : message['en']);

    this.name = name || 'ERROR';

    this.ptMessage = message['pt'];

    this.enMessage = message['en'];

    this.ptSolution = solution['pt'];

    this.enSolution = solution['en'];

    this.solution = language
      ? solution[language]
      : solution['en'] || 'CALL SUPPORT';
  }
}
