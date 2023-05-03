import { v4 as uuid } from 'uuid';
import { Activity } from '../entities';
import { IActivity, IPartialActivity } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomActivityFactory {
  public static createOne(props?: IPartialActivity): Activity {
    const activity: IActivity = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      data: `random-${uuid()}`,
      data_type: `random-${uuid()}`,
      account_id: `random-${uuid()}`,
      origin: `random-${uuid()}`,
      story_points: Math.floor(Math.random() * 101),
      type: `random-${uuid()}`,
      lead_id: `random-${uuid()}`,
      ...props,
    };
    return new Activity(activity);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialActivity) {
    const resultArray: Activity[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
