import { v4 as uuid } from 'uuid';
import { Lead } from '../entities';
import { ILead, IPartialLead } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomLeadFactory {
  public static createOne(props?: IPartialLead): Lead {
    const lead: ILead = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      account_id: `random-${uuid()}`,
      document: `random-${uuid()}`,
      company_id: `random-${uuid()}`,
      email: `random-${uuid()}`,
      birth_date: `random-${uuid()}`,
      phone: `random-${uuid()}`,
      import_id: `random-${uuid()}`,
      story_points: Math.floor(Math.random() * 101),
      origin: `random-${uuid()}`,
      is_opportunity: Math.random() < 0.5 ? false : true,
      user_id: `random-${uuid()}`,
      state: `random-${uuid()}`,
      ...props,
    };
    return new Lead(lead);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialLead) {
    const resultArray: Lead[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
