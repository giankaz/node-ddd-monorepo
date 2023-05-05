import { Entity } from '../../../shared';
import { ExampleValidator } from '../validator';
import * as vo from '../../application/dto/value-objects.dto';

export class Example
  extends Entity<ExampleValidator>
  implements ExampleValidator
{
  constructor(props: ExampleValidator) {
    super(props, ExampleValidator);
  }

  /*getters*/
}
