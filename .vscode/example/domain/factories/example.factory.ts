import { Example, ExampleInput } from '../entities';
import { ExampleModel } from '../models';

export class CreateExampleFactory {
  public static create(input: ExampleInput): ExampleModel {
    return new Example(input);
  }
}
