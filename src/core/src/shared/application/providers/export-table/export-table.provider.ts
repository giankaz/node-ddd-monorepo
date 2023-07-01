import { CsvExporter, XlsExporter, XlsxExporter } from './exporters';
import { IExporterInput, IExporterProvider } from './interfaces';

export const exporters = {
  xls: new XlsExporter(),
  csv: new CsvExporter(),
  xlsx: new XlsxExporter(),
};

export class ExportTableProvider implements IExporterProvider {
  public async export({ data, type }: IExporterInput): Promise<string> {
    const exporter = exporters[type];

    if (!exporter) {
      return;
    }

    return exporter.export(data);
  }
}
