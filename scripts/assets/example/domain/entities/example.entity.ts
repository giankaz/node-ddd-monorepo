import { Entity } from '../../../shared';
import { ExampleModel } from '../models';

export class Example extends Entity<ExampleModel> implements ExampleModel {
  constructor(props: ExampleModel) {
    super(props, ExampleModel);
  }

  /*getters*/
}
