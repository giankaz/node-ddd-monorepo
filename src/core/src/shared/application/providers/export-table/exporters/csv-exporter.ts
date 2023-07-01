import { writeFile } from 'fs/promises';
import { Parser } from 'json2csv';
import { resolve } from 'path';
import { addHashIfFileExist } from '../../../../utils/add-hash-if-file-exist';
import { ExportData, Exporter } from '../interfaces';

export class CsvExporter implements Exporter {
  public async export(data: ExportData): Promise<string> {
    const { columns, filename, path } = data;
    const filePath = addHashIfFileExist(resolve(path, `${filename}.csv`));

    const keysSet = new Set<string>();

    for (const column of columns) {
      const keys = Object.keys(column);

      for (const key of keys) {
        keysSet.add(key);
      }
    }

    const headers = Array.from(keysSet);

    const csv = new Parser({ fields: headers }).parse(columns);

    await writeFile(filePath, csv);

    return filePath;
  }
}
