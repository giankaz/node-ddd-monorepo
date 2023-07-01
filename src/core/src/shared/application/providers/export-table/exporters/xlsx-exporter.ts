import { resolve } from 'path';
import xlsxParser from 'node-xlsx';
import { writeFile } from 'fs/promises';
import { addHashIfFileExist } from '../../../../utils/add-hash-if-file-exist';
import { ExportData, Exporter } from '../interfaces';
import { exportTableColumnParser } from '../parser';

export class XlsxExporter implements Exporter {
  public async export(data: ExportData): Promise<string> {
    const { columns, filename, path } = data;
    const filePath = addHashIfFileExist(resolve(path, `${filename}.xlsx`));

    const exportData: string[][] = exportTableColumnParser(columns);

    const buffer = xlsxParser.build([
      { name: 'exported', data: exportData, options: {} },
    ]);

    await writeFile(filePath, buffer, 'binary');

    return filePath;
  }
}
