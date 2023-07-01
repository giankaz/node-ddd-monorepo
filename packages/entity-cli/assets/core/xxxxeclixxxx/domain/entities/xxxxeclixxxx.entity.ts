import { Entity } from '../../../shared';
import { XxxxeclixxxxValidator } from '../validator';
import * as vo from '../../application/dto/value-objects.dto';

export class Xxxxeclixxxx
  extends Entity<XxxxeclixxxxValidator>
  implements XxxxeclixxxxValidator
{
  static propsMap: Array<keyof XxxxeclixxxxValidator> = [
    /*propsmap*/
  ];

  constructor(props: XxxxeclixxxxValidator) {
    /*entitypresuper*/
    super(props, XxxxeclixxxxValidator, Xxxxeclixxxx.propsMap);
  }

  /*getters*/
}
