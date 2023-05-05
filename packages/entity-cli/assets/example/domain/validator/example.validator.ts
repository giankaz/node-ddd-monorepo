import { CommonEntityValidator } from '../../../shared';
import * as classValidator from 'class-validator';
import * as vo from '../../application/dto/value-objects.dto';

export class ExampleValidator extends CommonEntityValidator {
  /*validators*/

  constructor(props: ExampleValidator) {
    super(props);
    Object.assign(this, props);
  }
}
