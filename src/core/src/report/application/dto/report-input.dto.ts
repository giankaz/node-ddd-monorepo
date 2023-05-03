import { IReport } from './report.dto';

export type ReportInput = Omit<IReport, 'id'>;
