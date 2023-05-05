import * as fs from 'fs';
import path from 'path';

export type Ocurrances = {
  searchText: string;
  textToInsert: string;
};

export function insertAfterOccurrences(
  directoryPath: string,
  ocurrances: Ocurrances[],
) {
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      insertAfterOccurrences(filePath, ocurrances);
    } else {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      for (const ocurrance of ocurrances) {
        if (fileContents.includes(ocurrance.searchText)) {
          const newFileContents = fileContents.replace(
            ocurrance.searchText,
            `${ocurrance.searchText}\n${ocurrance.textToInsert}`,
          );
          fs.writeFileSync(filePath, newFileContents);
        }
      }
    }
  });
}
