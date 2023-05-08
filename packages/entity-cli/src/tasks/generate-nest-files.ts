import { execSync } from 'child_process';
import {
  Ocurrances,
  insertAfterOccurrences,
} from '../utils/insertAfterOccurrences';
import { renameFilesAndFolders } from '../utils/rename-files-and-folders';
import { Props } from '../models/props';
import { PropsTypes } from '../models/types';
import { parseDto } from '../parsers/parsedto';

export async function generateNestFiles(
  name: string,
  assetDir: string,
  outputDir: string,
  props: Props,
) {
  execSync(`cp -r ${assetDir} ${outputDir}/${name} `);

  const nameLowercase = name.toLowerCase();
  const nameUppercaseFirst =
    nameLowercase.charAt(0).toUpperCase() + nameLowercase.slice(1);
  const nameUpper = name.toUpperCase();

  execSync(
    `find ${outputDir} -type f -exec sed -i 's/xxxxeclixxxx/${nameLowercase}/g' {} +`,
  );
  execSync(
    `find ${outputDir} -type f -exec sed -i 's/Xxxxeclixxxx/${nameUppercaseFirst}/g' {} +`,
  );
  execSync(
    `find ${outputDir} -type f -exec sed -i 's/XXXXECLIXXXX/${nameUpper}/g' {} +`,
  );

  renameFilesAndFolders(outputDir, nameLowercase);

  const moduleOcurrence: Ocurrances[] = [];

  moduleOcurrence.push({
    searchText: '/*modules*/',
    textToInsert: `${nameUppercaseFirst}Module,`,
    topFileInsert: `import { ${nameUppercaseFirst}Module } from './modules/${name}'`,
  });

  insertAfterOccurrences(`${outputDir}/../../`, moduleOcurrence, true);

  const propsdto = parseDto(props);

  insertAfterOccurrences(`${outputDir}/${name}`, [
    {
      searchText: '/*propsdto*/',
      textToInsert: propsdto,
    },
  ]);

  console.log(
    '\x1b[1m%s\x1b[0m',
    `✅  The files for the NestJS Module ${name} were successfully created.\n\n🛠️   Now the files are being formatted by prettier and builded.\n\n`,
  );
}
