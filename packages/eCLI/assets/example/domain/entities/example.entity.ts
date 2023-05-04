import { Entity } from '../../../shared';
import { ExampleModel } from '../models';
import * as vo from '../../application/dto/value-objects.dto';

export class Example extends Entity<ExampleModel> implements ExampleModel {
  constructor(props: ExampleModel) {
    super(props, ExampleModel);
  }

  /*getters*/
}
