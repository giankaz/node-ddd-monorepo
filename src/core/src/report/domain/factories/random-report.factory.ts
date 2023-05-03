import { v4 as uuid } from 'uuid';
import { Report } from '../entities';
import { IReport, IPartialReport } from '../../application';
import { CommonStatus } from '../../../shared';

export class RandomReportFactory {
  public static createOne(props?: IPartialReport): Report {
    const report: IReport = {
      name: `RANDOM-${uuid()}`,
      created_at: new Date(),
      id: uuid(),
      status: CommonStatus.ACTIVE,
      updated_at: null,
      customers: Math.floor(Math.random() * 101),
      conversions: Math.floor(Math.random() * 101),
      qualified_leads: Math.floor(Math.random() * 101),
      opportunities: Math.floor(Math.random() * 101),
      leads: Math.floor(Math.random() * 101),
      ...props,
    };
    return new Report(report);
  }

  public static createMultiple(arrayLength = 2, props?: IPartialReport) {
    const resultArray: Report[] = [];
    for (let i = 0; i < arrayLength; i++) {
      const randomLandingPage = props
        ? this.createOne(props)
        : this.createOne();
      resultArray.push(randomLandingPage);
    }
    return resultArray;
  }
}
