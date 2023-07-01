export interface Exporter {
  export(data: unknown): Promise<string>;
}

export type ExportTypes = 'xls' | 'xlsx' | 'csv';

export interface IExporterProvider {
  export(data: IExporterInput): Promise<string>;
}

export interface ExportData {
  path: string;
  filename: string;
  columns: unknown[];
}

export interface IExporterInput {
  data: ExportData;
  type: ExportTypes;
}
