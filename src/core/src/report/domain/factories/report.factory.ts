import { Report } from '../entities';
import { ReportInput } from '../../application';

export class CreateReportFactory {
  public static create(input: ReportInput): Report {
    return new Report(input);
  }
}
