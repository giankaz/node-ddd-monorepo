import { v4 as uuid } from 'uuid';
import { Xxxxeclixxxx } from '../entities';
import { IXxxxeclixxxx, IPartialXxxxeclixxxx } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomXxxxeclixxxxFactory {
  public static createOne(props?: IPartialXxxxeclixxxx): Xxxxeclixxxx {
    const xxxxeclixxxx: IXxxxeclixxxx = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      /*random*/
      ...props,
    };
    return new Xxxxeclixxxx(xxxxeclixxxx);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialXxxxeclixxxx) {
    const resultArray: Xxxxeclixxxx[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
