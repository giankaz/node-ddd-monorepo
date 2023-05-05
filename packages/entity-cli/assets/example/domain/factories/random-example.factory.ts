import { v4 as uuid } from 'uuid';
import { Example } from '../entities';
import { IExample, IPartialExample } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomExampleFactory {
  public static createOne(props?: IPartialExample): Example {
    const example: IExample = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      /*random*/
      ...props,
    };
    return new Example(example);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialExample) {
    const resultArray: Example[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
