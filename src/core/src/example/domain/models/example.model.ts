import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';

export class ExampleModel extends CommonEntityModel {
  /*models*/

  constructor(props: ExampleModel) {
    super(props);
    Object.assign(this, props);
  }
}
