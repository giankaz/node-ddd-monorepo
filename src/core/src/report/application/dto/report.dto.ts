import { ReportModel } from '../../domain';

export type IReport = Pick<ReportModel, keyof ReportModel>;
