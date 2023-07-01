import { execSync } from 'child_process';
import { Props } from '../interfaces/props';
import { PropsTypes } from '../interfaces/types';
import { RandomFactoryParser } from '../parsers/random-factory.parser';
import { MongoParser } from '../parsers/mongo.parser';
import { renameFilesAndFolders } from '../utils/rename-files-and-folders.util';
import {
  Occurrences,
  insertAfterOccurrences,
} from '../utils/insert-after-occurrences.util';
import { ClassInterfacesParser } from '../parsers/classes-interfaces.parser';
import { primitiveTypes } from '../constants/primitives';
import { GetterSetterParser } from '../parsers/getter-setter.parser';
import { ValidatorParser } from '../parsers/validator.parser';
import { IHandler } from '../interfaces/handler';
import { boldLog } from '../utils/logger';

interface IGenerateFiles {
  name: string;
  coreAssetsDir: string;
  coreOutputDir: string;
  props: Props;
}
export class GenerateCoreFilesHandler implements IHandler {
  constructor(private readonly data: IGenerateFiles) {}

  nameLowercase = this.data.name.toLowerCase();

  nameUppercaseFirst =
    this.nameLowercase.charAt(0).toUpperCase() + this.nameLowercase.slice(1);

  nameUpper = this.data.name.toUpperCase();

  props = this.data.props;

  public async handle(isAddProp?: boolean): Promise<void> {
    const { name, props, coreOutputDir } = this.data;

    if (!isAddProp) {
      this.generateAndRename();
    }

    const outsideOccurrences: Occurrences[] = [];

    const mongoSchema = new MongoParser().execute(props);

    outsideOccurrences.push({
      searchText: '/*mongoschema*/',
      textToInsert: mongoSchema,
    });

    const randomFactory = new RandomFactoryParser().execute(props);

    outsideOccurrences.push({
      searchText: '/*random*/',
      textToInsert: randomFactory,
    });

    insertAfterOccurrences(coreOutputDir, outsideOccurrences);

    for (const key in props) {
      const {
        isArray,
        isNumber,
        isObject,
        keyUppercaseFirst,
        keyUppercaseFirstParsed,
        parsedKey,
        parsedType,
        validation,
        isOptional,
      } = this.parseRelevantKeys(key);

      const commonFields = ['id', 'created_at', 'updated_at', 'status'];

      if (commonFields.includes(parsedKey) && !isObject) {
        break;
      }

      const occurrences: Occurrences[] = [];

      const { getter, setter } = new GetterSetterParser().execute({
        isOptional,
        keyUppercaseFirstParsed,
        parsedKey,
        parsedType,
        validation,
      });

      occurrences.push({
        searchText: '/*getters*/',
        textToInsert: `${getter}
        
        ${setter}
        `,
      });

      if (isObject) {
        const objectTypeInterfaces = new ClassInterfacesParser().execute({
          interfaceName: keyUppercaseFirst,
          props: props[key] as Props,
          entityName: name,
        });

        occurrences.push({
          searchText: '/*objectstypes*/',
          textToInsert: objectTypeInterfaces,
        });
      }

      const message = isOptional ? `` : `message: Translations.x_is_required`;

      const validator = new ValidatorParser().execute({
        isArray,
        isNumber,
        isObject,
        isOptional,
        key,
        message,
        parsedType,
        validation,
      });

      occurrences.push({
        searchText: '/*validators*/',
        textToInsert: validator,
      });

      insertAfterOccurrences(coreOutputDir, occurrences);

      const sameFileOccurrences: Occurrences[] = [];

      if (validation === 'Date') {
        sameFileOccurrences.push({
          searchText: '/*entitypresuper*/',
          textToInsert: `props.${parsedKey} &&= new Date(props.${parsedKey});`,
        });
      }

      insertAfterOccurrences(coreOutputDir, sameFileOccurrences);

      insertAfterOccurrences(coreOutputDir, [
        {
          searchText: '/*propsmap*/',
          textToInsert: `'${parsedKey}', `,
        },
      ]);
    }

    boldLog(
      `\n\n✅  The core files for the entity ${name} were successfully created.\n\n`,
    );
  }

  private parseRelevantKeys(key: string) {
    let parsedKey = key;

    const keyUppercaseFirst =
      parsedKey.charAt(0).toUpperCase() + parsedKey.slice(1);

    const isObject = !primitiveTypes.includes(this.props[key] as PropsTypes);

    const type = isObject ? keyUppercaseFirst : (this.props[key] as PropsTypes);

    let isOptional = false;

    if (parsedKey.includes('?')) {
      isOptional = true;
      parsedKey = parsedKey.replace('?', '');
    }

    const keyUppercaseFirstParsed =
      parsedKey.charAt(0).toUpperCase() + parsedKey.slice(1);

    let isArray = false;

    if (type.endsWith('[]')) {
      isArray = true;
    }

    const validation = isObject
      ? 'NotEmptyObject'
      : type.charAt(0).toUpperCase() + type.replace('[]', '').slice(1);

    const parsedType = isObject ? `vo.${this.nameUppercaseFirst}${type}` : type;

    const isNumber = parsedType.includes('number');

    return {
      isOptional,
      isNumber,
      isObject,
      parsedType,
      parsedKey,
      validation,
      isArray,
      keyUppercaseFirst,
      keyUppercaseFirstParsed,
    };
  }

  private generateAndRename() {
    const { name, coreAssetsDir, coreOutputDir } = this.data;

    execSync(`cp -r ${coreAssetsDir} ${coreOutputDir}`);

    execSync(
      `find ${coreOutputDir} -type f -exec sed -i 's/xxxxeclixxxx/${this.nameLowercase}/g' {} +`,
    );
    execSync(
      `find ${coreOutputDir} -type f -exec sed -i 's/Xxxxeclixxxx/${this.nameUppercaseFirst}/g' {} +`,
    );
    execSync(
      `find ${coreOutputDir} -type f -exec sed -i 's/XXXXECLIXXXX/${this.nameUpper}/g' {} +`,
    );

    renameFilesAndFolders(coreOutputDir, name);
  }
}
