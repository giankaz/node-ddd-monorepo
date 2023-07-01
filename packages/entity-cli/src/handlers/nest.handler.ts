import { execSync } from 'child_process';
import {
  Occurrences,
  insertAfterOccurrences,
} from '../utils/insert-after-occurrences.util';
import { renameFilesAndFolders } from '../utils/rename-files-and-folders.util';
import { Props } from '../interfaces/props';
import { DtoParser } from '../parsers/dtos.parser';
import { ClassInterfacesParser } from '../parsers/classes-interfaces.parser';
import { PropsTypes } from '../interfaces/types';
import { IHandler } from '../interfaces/handler';
import { boldLog } from '../utils/logger';

interface IGenerateNestFiles {
  name: string;
  nestAssetsDir: string;
  nestOutputDir: string;
  props: Props;
}

export class GenerateNestFilesHandler implements IHandler {
  constructor(private readonly data: IGenerateNestFiles) {}

  nameLowercase = this.data.name.toLowerCase();

  nameUppercaseFirst =
    this.nameLowercase.charAt(0).toUpperCase() + this.nameLowercase.slice(1);

  nameUpper = this.data.name.toUpperCase();

  public async handle(isAddProp?: boolean): Promise<void> {
    const { name, nestOutputDir, props } = this.data;

    if (!isAddProp) {
      this.generateAndRename();

      const moduleOccurrence: Occurrences[] = [];

      moduleOccurrence.push({
        searchText: '/*modules*/',
        textToInsert: `${this.nameUppercaseFirst}Module,`,
        topFileInsert: `import { ${this.nameUppercaseFirst}Module } from './modules/${name}'`,
      });

      insertAfterOccurrences(`${nestOutputDir}/../../`, moduleOccurrence, true);
    }

    const propsdto = new DtoParser().execute({
      props,
      name: this.nameUppercaseFirst,
    });

    insertAfterOccurrences(`${nestOutputDir}`, [
      {
        searchText: '/*propsdto*/',
        textToInsert: propsdto,
      },
    ]);

    for (const key in props) {
      const keyUppercaseFirst = key.charAt(0).toUpperCase() + key.slice(1);

      const primitiveTypes = [
        'string',
        'number',
        'Date',
        'boolean',
        'string[]',
        'number[]',
      ];
      const isObject = !primitiveTypes.includes(props[key] as PropsTypes);

      const occurrences: Occurrences[] = [];
      if (isObject) {
        const objectTypeInterfaces = new ClassInterfacesParser().execute({
          props: props[key] as Props,
          interfaceName: keyUppercaseFirst,
          entityName: name,
        });

        occurrences.push({
          searchText: '/*objectstypes*/',
          textToInsert: objectTypeInterfaces,
        });

        insertAfterOccurrences(`${nestOutputDir}`, occurrences);
      }
    }

    boldLog(
      `✅  The files for the NestJS Module ${name} were successfully created.\n\n\n🛠️   Now the project are rebuilding, and the new files are being formatted by prettier and tested.\n\n`,
    );
  }

  private generateAndRename() {
    const { nestAssetsDir, nestOutputDir } = this.data;
    execSync(`cp -r ${nestAssetsDir} ${nestOutputDir} `);

    execSync(
      `find ${nestOutputDir} -type f -exec sed -i 's/xxxxeclixxxx/${this.nameLowercase}/g' {} +`,
    );
    execSync(
      `find ${nestOutputDir} -type f -exec sed -i 's/Xxxxeclixxxx/${this.nameUppercaseFirst}/g' {} +`,
    );
    execSync(
      `find ${nestOutputDir} -type f -exec sed -i 's/XXXXECLIXXXX/${this.nameUpper}/g' {} +`,
    );

    renameFilesAndFolders(nestOutputDir, this.nameLowercase);
  }
}
