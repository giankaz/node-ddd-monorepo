import { Example } from '../entities';
import { ExampleInput } from '../../application';

export class CreateExampleFactory {
  public static create(input: ExampleInput): Example {
    return new Example(input);
  }
}
