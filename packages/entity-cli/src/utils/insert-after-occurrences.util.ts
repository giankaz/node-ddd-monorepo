import * as fs from 'fs';
import path from 'path';

export type Occurrences = {
  searchText: string;
  textToInsert: string;
  topFileInsert?: string;
};

export function insertAfterOccurrences(
  directoryPath: string,
  occurrences: Occurrences[],
  checkIfExists = false,
) {
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      insertAfterOccurrences(filePath, occurrences);
    } else {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      for (const occurrence of occurrences) {
        if (checkIfExists) {
          if (
            fileContents
              .toLowerCase()
              .includes(occurrence.textToInsert.toLowerCase())
          ) {
            break;
          }
        }
        if (fileContents.includes(occurrence.searchText)) {
          const newFileContents = fileContents.replace(
            occurrence.searchText,
            `${occurrence.searchText}\n${occurrence.textToInsert}`,
          );
          if (
            occurrence?.topFileInsert &&
            !fileContents.includes(occurrence?.topFileInsert)
          ) {
            fs.writeFileSync(
              filePath,
              `
            ${occurrence.topFileInsert}
            ${newFileContents}
            `,
            );
          } else {
            fs.writeFileSync(filePath, newFileContents);
          }
        }
      }
    }
  });
}
