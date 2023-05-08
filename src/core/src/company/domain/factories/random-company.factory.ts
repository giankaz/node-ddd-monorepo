import { v4 as uuid } from 'uuid';
import { Company } from '../entities';
import { ICompany, IPartialCompany } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomCompanyFactory {
  public static createOne(props?: IPartialCompany): Company {
    const company: ICompany = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      /*random*/
      lead_count: Math.floor(Math.random() * 101),
      email: uuid(),
      phone: uuid(),
      document: uuid(),
      account_id: uuid(),
      ...props,
    };
    return new Company(company);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialCompany) {
    const resultArray: Company[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
