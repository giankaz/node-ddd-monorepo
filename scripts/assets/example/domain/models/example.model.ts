import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';
import * as vo from '../../application/dto/value-objects.dto';

export class ExampleModel extends CommonEntityModel {
  /*models*/

  constructor(props: ExampleModel) {
    super(props);
    Object.assign(this, props);
  }
}
