import { v4 as uuidv4 } from 'uuid';
import { Example, IExample, IPartialExample } from '../entities';
import { CommonStatus } from '../../../shared';

export class RandomExampleFactory {
  public static createOne(props?: IPartialExample): Example {
    const example: IExample = {
      name: `RANDOM-${uuidv4()}`,
      value: Math.random(),
      created_at: new Date(),
      id: uuidv4(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
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
