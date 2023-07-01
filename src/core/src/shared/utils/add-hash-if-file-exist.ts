import { existsSync } from 'fs';
import { parse, resolve } from 'path';
import { createHash, randomBytes } from 'crypto';

export const addHashIfFileExist = (filePath: string): string => {
  const fileExists = existsSync(filePath);

  if (fileExists) {
    const hash = createHash('md5')
      .update(`${filePath}${randomBytes(24).toString()}${Date.now()}`)
      .digest('hex');
    const { dir, base } = parse(filePath);

    return resolve(dir, `${hash}-${base}`);
  }

  return filePath;
};
