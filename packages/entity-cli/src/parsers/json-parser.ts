import * as fs from 'fs/promises';
import { generateFiles } from '../tasks/generate-files';
import { addPropToEntity } from '../tasks/add-prop-to-entity';
import { Props } from '../models/props';
import { keyValidator } from '../utils/keyValidator';

function loopNestedObject(obj: Props, callback: (key: string) => void) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      loopNestedObject(obj[key] as Props, callback); // recursively call the function for nested objects
    } else {
      callback(key);
    }
  }
}

export async function jsonGenParser(
  path: string,
  name: string,
  assetDir: string,
  outputDir: string,
) {
  try {
    const data = await fs.readFile(path);
    const jsonData = JSON.parse(data.toString());
    loopNestedObject(jsonData, (key: string) => {
      keyValidator(key, true);
    });
    await generateFiles(name, assetDir, outputDir, jsonData);
  } catch (err) {
    console.error(err);
  }
}

export async function jsonAddFieldParser(path: string, jsonPath: string) {
  try {
    const data = await fs.readFile(jsonPath);
    const jsonData = JSON.parse(data.toString());
    loopNestedObject(jsonData, (key: string) => {
      keyValidator(key, true);
    });
    await addPropToEntity(path, jsonData);
  } catch (err) {
    console.error(err);
  }
}
