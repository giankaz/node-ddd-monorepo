import { v4 as uuid } from 'uuid';
import { Importation } from '../entities';
import { IImportation, IPartialImportation } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomImportationFactory {
  public static createOne(props?: IPartialImportation): Importation {
    const importation: IImportation = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      contact_total: Math.floor(Math.random() * 101),
      account_id: `random-${uuid()}`,
      company_id: `random-${uuid()}`,
      emails_total: Math.floor(Math.random() * 101),
      ...props,
    };
    return new Importation(importation);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialImportation) {
    const resultArray: Importation[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
