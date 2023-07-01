import Listr from 'listr';
import { Props } from '../models/props';
import { parseMongo } from '../parsers/mongo.parser';
import { parseRandom } from '../parsers/random.parser';
import {
  Ocurrances,
  insertAfterOccurrences,
} from '../utils/insertAfterOccurrences';
import { formatAndBuild } from './format-and-build';
import { testNewFiles } from './test-new-files';
import { parseObjectInterfaces } from '../parsers/object-interfaces.parser';
import { PropsTypes } from '../models/types';
import { addPropToNest } from './add-prop-to-nest';

export async function addPropToEntity(
  path: string,
  props: Props,
  nestPath?: string,
) {
  const currentDir = path.split('/').slice(0, -1).join('/');
  const dirArr = currentDir.split('/');
  const name = dirArr[dirArr.length - 1];
  const nameUppercaseFirst = name.charAt(0).toUpperCase() + name.slice(1);

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

  insertAfterOccurrences(path, outsideOcurrences);
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

    let setter = `set ${parsedKey}(new${keyUppercaseFirstParsed}: ${parsedType}){ 
      this.props.${parsedKey}= ${
      validation === 'Date'
        ? `new Date(new${keyUppercaseFirstParsed})`
        : `new${keyUppercaseFirstParsed}`
    };
      this.update()
    };\n`;

    if (isOptional) {
      setter = `set ${parsedKey}(new${keyUppercaseFirstParsed}:${parsedType}|null){
        this.props.${parsedKey}= ${
        validation === 'Date'
          ? `new Date(new${keyUppercaseFirstParsed})`
          : `new${keyUppercaseFirstParsed}`
      };
        this.update()
      };\n`;
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
        nameUppercaseFirst,
      );

      ocurrances.push({
        searchText: '/*objectstypes*/',
        textToInsert: objectTypeInterfaces,
      });
    }

    const context = `context: '${currentDir} - ${key} - ${parsedType}'`;

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

    insertAfterOccurrences(path, ocurrances);
  }

  console.log(
    '\x1b[1m%s\x1b[0m',
    `✅  The files for the entity ${name} were successfully updated.\n\n🛠️   Now the files are being formatted by prettier, builded, and tested.\n\n`,
  );

  const tasks = new Listr([
    {
      title: '🛠️  Formatting and Building. 🛠️\n',
      task: () => formatAndBuild(),
    },
    {
      title: '✅ Testing new files. ✅\n\n',
      task: async () => testNewFiles(currentDir),
    },
  ]);

  await tasks
    .run()
    .then(async () => {
      if (nestPath) {
        await addPropToNest(name, props, nestPath);

        new Listr([
          {
            title: '🛠️  Formatting and Building Nest. 🛠️\n',
            task: () => formatAndBuild('nest'),
          },
        ])
          .run()
          .finally(() => {
            console.log(
              '\x1b[1m%s\x1b[0m',
              `🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆
🎆                                                               \u2009🎆
🎆       🚀 The entity generator has finished it process. 🚀     \u2009🎆
🎆                                                               \u2009🎆
🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆`,
            );
          });
      }
    })
    .catch((err) => {
      `❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
❌                                                               \u2009❌
❌          😥    The entity generator had an error.  😥         \u2009❌
❌                                                               \u2009❌
❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌`;
      console.error(err);
    })
    .finally(() => {
      if (!nestPath) {
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
    });
}
