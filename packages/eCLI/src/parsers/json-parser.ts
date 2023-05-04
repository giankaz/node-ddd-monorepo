import * as fs from 'fs/promises';
import { generateFiles } from '../tasks/generate-files';

export async function jsonParser(
  path: string,
  name: string,
  assetDir: string,
  outputDir: string,
) {
  try {
    const data = await fs.readFile(path);
    const jsonData = JSON.parse(data.toString());
    await generateFiles(name, assetDir, outputDir, jsonData);
  } catch (err) {
    console.error(err);
  }
}
