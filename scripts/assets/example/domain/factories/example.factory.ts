import { Example } from '../entities';
import { ExampleInput } from '../../application';
import { ExampleModel } from '../models';

export class CreateExampleFactory {
  public static create(input: ExampleInput): ExampleModel {
    return new Example(input);
  }
}
