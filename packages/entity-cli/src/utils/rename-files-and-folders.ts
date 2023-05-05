import * as fs from 'fs';
import path from 'path';

export function renameFilesAndFolders(dir: string, replacer: string) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      renameFilesAndFolders(filePath, replacer);
    }
    if (file.includes('example')) {
      const newFilePath = path.join(dir, file.replace(/example/g, replacer));
      fs.renameSync(filePath, newFilePath);
    }
  });
}
