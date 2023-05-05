import { execSync } from 'child_process';
import { Props } from '../models/props';
import { PropsTypes } from '../models/types';
import { parseObjectInterfaces } from '../parsers/object-interfaces.parser';
import { parseRandom } from '../parsers/random.parser';
import { parseMongo } from '../parsers/mongo.parser';
import { formatAndBuild } from './format-and-build';
import Listr from 'listr';
import { testNewFiles } from './test-new-files';
import { renameFilesAndFolders } from '../utils/rename-files-and-folders';
import {
  Ocurrances,
  insertAfterOccurrences,
} from '../utils/insertAfterOccurrences';

export async function generateFiles(
  name: string,
  assetDir: string,
  outputDir: string,
  props: Props,
) {
  execSync(`cp -r ${assetDir} ${outputDir}`);

  const nameLowercase = name.toLowerCase();
  const nameUppercaseFirst =
    nameLowercase.charAt(0).toUpperCase() + nameLowercase.slice(1);
  const nameUpper = name.toUpperCase();

  execSync(
    `find ${outputDir} -type f -exec sed -i 's/example/${nameLowercase}/g' {} +`,
  );
  execSync(
    `find ${outputDir} -type f -exec sed -i 's/Example/${nameUppercaseFirst}/g' {} +`,
  );
  execSync(
    `find ${outputDir} -type f -exec sed -i 's/EXAMPLE/${nameUpper}/g' {} +`,
  );

  renameFilesAndFolders(outputDir, nameLowercase);

  const outsideOcurrences: Ocurrances[] = [];

  const mongoSchema = parseMongo(props);

  outsideOcurrences.push({
    searchText: '/*mongoschema*/',
    textToInsert: mongoSchema,
  });

  const rand = parseRandom(props);

  outsideOcurrences.push({
    searchText: '/*random*/',
    textToInsert: rand,
  });

  insertAfterOccurrences(outputDir, outsideOcurrences);

  for (const key in props) {
    const primitiveTypes = [
      'string',
      'number',
      'Date',
      'boolean',
      'string[]',
      'number[]',
    ];

    const ocurrances: Ocurrances[] = [];

    let parsedKey = key;

    const keyUppercaseFirst =
      parsedKey.charAt(0).toUpperCase() + parsedKey.slice(1);

    const isObject = !primitiveTypes.includes(props[key] as PropsTypes);

    const type = isObject ? keyUppercaseFirst : (props[key] as PropsTypes);

    let isOptional = false;
    if (parsedKey.includes('?')) {
      isOptional = true;
      parsedKey = parsedKey.replace('?', '');
    }

    const keyUppercaseFirstParsed =
      parsedKey.charAt(0).toUpperCase() + parsedKey.slice(1);

    const commonFields = ['id', 'name', 'created_at', 'updated_at', 'status'];
    if (commonFields.includes(parsedKey) && !isObject) {
      break;
    }

    let isArray = false;

    if (type.endsWith('[]')) {
      isArray = true;
    }

    const validation = isObject
      ? 'NotEmptyObject'
      : type.charAt(0).toUpperCase() + type.replace('[]', '').slice(1);

    const parsedType = isObject ? `vo.${nameUppercaseFirst}${type}` : type;

    const isNumber = parsedType.includes('number');

    let getter = `get ${parsedKey}(): ${parsedType}{ return this.props.${parsedKey}};\n\n`;

    if (isOptional) {
      getter = `get ${parsedKey}():${parsedType}{ return this.props?.${parsedKey}};\n\n`;
    }

    let setter = `set ${parsedKey}(new${keyUppercaseFirstParsed}: ${parsedType}){ this.props.${parsedKey}=new${keyUppercaseFirstParsed};this.update()};\n\n`;

    if (isOptional) {
      setter = `set ${parsedKey}(new${keyUppercaseFirstParsed}:${parsedType}|null){this.props.${parsedKey}=new${keyUppercaseFirstParsed};this.update()};\n\n`;
    }

    ocurrances.push({
      searchText: '/*getters*/',
      textToInsert: `${getter}
      
      ${setter}
      `,
    });

    if (isObject) {
      const objectTypeInterfaces = parseObjectInterfaces(
        props[key] as Props,
        keyUppercaseFirst,
        name,
      );

      ocurrances.push({
        searchText: '/*objectstypes*/',
        textToInsert: objectTypeInterfaces,
      });
    }

    const context = `context: '${name} - ${key} - ${parsedType}'`;

    let validator = `@classValidator.Is${validation}(${
      isArray
        ? isNumber || isObject
          ? `{} , { each: true, ${context} }`
          : `{ each: true, ${context} }`
        : isNumber || isObject
        ? `{}, { ${context} }`
        : `{ ${context} }`
    })\n ${key}:${parsedType}; \n\n`;

    if (isOptional) {
      validator = `@classValidator.Is${validation}(${
        isArray
          ? isNumber || isObject
            ? `{} , { each: true, ${context} }`
            : `{ each: true, { ${context} }`
          : isNumber || isObject
          ? `{}, { ${context} }`
          : `{ ${context} }`
      })\n @classValidator.IsOptional() \n ${key}: ${parsedType};\n\n`;
    }

    ocurrances.push({
      searchText: '/*validators*/',
      textToInsert: validator,
    });

    const toentityprops = `${parsedKey}: model.${parsedKey},`;

    ocurrances.push({
      searchText: '/*toentityprops*/',
      textToInsert: toentityprops,
    });

    insertAfterOccurrences(outputDir, ocurrances);
  }

  console.log(
    '\x1b[1m%s\x1b[0m',
    `✅  The files for the entity ${name} were successfully created.\n\n🛠️   Now the files are being formatted by prettier, builded, and tested.\n\n`,
  );

  const tasks = new Listr([
    {
      title: '🛠️  Formatting and Building. 🛠️\n',
      task: () => formatAndBuild(),
    },
    {
      title: '✅ Testing new files. ✅\n\n',
      task: async () => testNewFiles(name),
    },
  ]);

  await tasks.run().catch((err) => {
    console.error(err);
  });

  console.log(
    '\x1b[1m%s\x1b[0m',
    `🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆
🎆                                                               \u2009🎆
🎆       🚀 The entity generator has finished it process. 🚀     \u2009🎆
🎆                                                               \u2009🎆
🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆`,
  );
  process.exit();
}
