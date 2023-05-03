const { execSync } = require('child_process');
const fs = require('fs');
const prompts = require('prompts');
const Listr = require('listr');

const props = {};
let assetDir = '';
let outputDir = '';
let currentDir = '';
let name = '';

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'entityName',
    message: '🖊️  Enter the entity name: ',
  });

  name = response.entityName;
  const scriptPath = __filename;
  currentDir = scriptPath.split('/').slice(0, -1).join('/');

  assetDir = `${currentDir}/assets/example`;
  outputDir = `${currentDir}/../src/core/src/${name}`;

  if (fs.existsSync(outputDir)) {
    (async () => {
      const { yesOrNo } = await prompts([
        {
          type: 'select',
          name: 'yesOrNo',

          message:
            '⚠️ Folder of the entity already exists ⚠️.\n ⚠️ Do you wish to delete the previous folder and create a new entity from scratch?\n',
          choices: [
            { title: 'Yes ✅\n', value: 'yes' },
            { title: 'No  ❌', value: 'no' },
          ],
        },
      ]);
      if (yesOrNo === 'yes') {
        execSync(`rm -rf ${outputDir}`);
        console.log('Excluding existing folder...');
      } else {
        console.log('Entity generation stopped.');
        process.exit();
      }
      (async () => await createEntity())();
    })();
  } else {
    (async () => await createEntity())();
  }

  async function createEntity() {
    async function prompt() {
      (async () => {
        const propsResponse = await prompts({
          type: 'text',
          name: 'prop',
          message:
            "🖊️  Enter the field name, if optional put a ? as last character.\n  ℹ️  Enter 's' to save and finish ✅\n  ℹ️  Enter 'q' to quit ❌ \n",
        });

        const prop = propsResponse.prop;

        if (prop === 's') {
          await generateFiles();
          return;
        }

        if (prop === 'q') {
          process.exit();
        }

        (async () => {
          const options = [
            {
              type: 'select',
              name: 'type',
              message: `Choose the type of ${prop}\n`,
              choices: [
                { title: 'string   🔠\n', value: 'string' },
                { title: 'number   🔢\n', value: 'number' },
                { title: 'Date     📅\n', value: 'Date' },
                { title: 'boolean  ❓\n', value: 'boolean' },
                { title: 'object   🤨\n', value: 'object' },
                { title: 'string[] 🔠\n', value: 'string[]' },
                { title: 'number[] 🔢\n', value: 'number[]' },
              ],
            },
          ];

          const typeRes = await prompts(options);

          const type = typeRes.type;

          if (type === 'object') {
            let obj = {};

            async function promptSubprop() {
              (async () => {
                const response = await prompts({
                  type: 'text',
                  name: 'subprop',
                  message: `🖊️  Enter the ${prop} sub field name, if optional put a ? as last character.\n  ℹ️  Enter 's' to save and finish ✅\n  ℹ️  Enter 'q' to quit entity creation ❌ \n  ℹ️  Enter 'r' to reset sub fields 🔄 \n  ℹ️  Enter 'b' to return to entity without saving object 🔙 \n`,
                });

                const subprop = response.subprop;

                if (subprop === 'r') {
                  obj = {};
                  return await promptSubprop();
                }

                if (subprop === 'b') {
                  return await prompt();
                }

                if (subprop === 's') {
                  props[prop] = obj;
                  return await prompt();
                }

                if (subprop === 'q') {
                  process.exit();
                }

                const suboptions = [
                  {
                    type: 'select',
                    name: 'type',
                    message: `Choose the type of ${subprop}\n`,
                    choices: [
                      { title: 'string   🔠\n', value: 'string' },
                      { title: 'number   🔢\n', value: 'number' },
                      { title: 'Date     📅\n', value: 'Date' },
                      { title: 'boolean  ❓\n', value: 'boolean' },
                      { title: 'string[] 🔠\n', value: 'string[]' },
                      { title: 'number[] 🔢\n', value: 'number[]' },
                    ],
                  },
                ];

                (async () => {
                  const responseType = await prompts(suboptions);
                  const type = responseType.type;
                  obj[subprop] = type;
                  await promptSubprop();
                })();
              })();
            }
            await promptSubprop();
          } else {
            props[prop] = type;
            await prompt();
          }
        })();
      })();
    }
    await prompt();
  }

  async function generateFiles() {
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

    execSync(
      `find ${outputDir} -depth -name '*example*' -execdir rename 's/example/${nameLowercase}/' {} +`,
    );

    for (const key in props) {
      const primitiveTypes = [
        'string',
        'number',
        'Date',
        'boolean',
        'string[]',
        'number[]',
      ];

      let parsedKey = key;

      const keyUppercaseFirst =
        parsedKey.charAt(0).toUpperCase() + parsedKey.slice(1);

      const isObject = !primitiveTypes.includes(props[key]);

      let type = isObject ? keyUppercaseFirst : props[key];

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

      let getter = `get ${parsedKey}(): ${parsedType}{ return this.props.${parsedKey}};`;

      if (isOptional) {
        getter = `get ${parsedKey}():${parsedType}{ return this.props?.${parsedKey}};`;
      }

      let setter = `set ${parsedKey}(new${keyUppercaseFirstParsed}: ${parsedType}){ this.props.${parsedKey}=new${keyUppercaseFirstParsed};this.update()};`;

      if (isOptional) {
        setter = `set ${parsedKey}(new${keyUppercaseFirstParsed}:${parsedType}|null){this.props.${parsedKey}=new${keyUppercaseFirstParsed};this.update()};`;
      }
      execSync(
        `find ${outputDir} -type f -exec sed -i "/\\/\\*getters\\*\\//a  ${setter}" {} \\;`,
      );

      execSync(
        `find ${outputDir} -type f -exec sed -i "/\\/\\*getters\\*\\//a  ${getter}"  {} \\;`,
      );

      if (isObject) {
        const objectTypeInterfaces = parseObjectTypeInterfaces(
          props[key],
          keyUppercaseFirst,
        );
        execSync(
          `find ${outputDir} -type f -exec sed -i "/\\/\\*objectstypes\\*\\//a  ${objectTypeInterfaces}"  {} \\;`,
        );
      }

      const context = `context: '${name - key - parsedType}'`;

      let model = `@classValidator.Is${validation}(${
        isArray
          ? isNumber
            ? `{ allowNaN: false } , { each: true, ${context} }`
            : `{ each: true, ${context} }`
          : ''
      }) ${key}:${parsedType}; `;

      if (isOptional) {
        model = `@classValidator.Is${validation}(${
          isArray
            ? isNumber
              ? `{ allowNaN: false } , { each: true, ${context} }`
              : `{ each: true, ${context} }`
            : ''
        }) @classValidator.IsOptional() ${key}: ${parsedType};`;
      }

      execSync(
        `find ${outputDir} -type f -exec sed -i "/\\/\\*models\\*\\//a ${model}"  {} \\;`,
      );

      let randomType = ``;

      randomType = parseRandom(parsedKey, key, props, isObject);

      execSync(
        `find ${outputDir} -type f -exec sed -i "/\\/\\*random\\*\\//a ${randomType}"  {} \\;`,
      );

      const mongoSchema = parseMongo(type, parsedKey, isOptional, props);

      execSync(
        `find ${outputDir} -type f -exec sed -i "/\\/\\*mongoschema\\*\\//a ${mongoSchema}"  {} \\;`,
      );

      const toentityprops = `${parsedKey}: model.${parsedKey},`;

      execSync(
        `find "${outputDir}" -type f -exec sed -i "/\\/\\*toentityprops\\*\\//a ${toentityprops}" {} \\;`,
      );
    }

    console.log(
      '\x1b[1m%s\x1b[0m',
      `✅  The files for the entity ${name} were successfully created.\n\n🛠️  Now the files are being formatted by prettier, builded, and tested.\n\n`,
    );

    const tasks = new Listr([
      {
        title: '🛠️  Formatting and Building. 🛠️\n',
        task: () =>
          new Promise((res, reject) => {
            try {
              execSync(`cd ${process.cwd()} && pnpm core:build`);
              res();
            } catch (err) {
              reject(err);
            }
          }),
      },
      {
        title: '✅ Testing new files. ✅\n\n',
        task: async () =>
          new Promise((res) => {
            try {
              execSync(
                `cd "${process.cwd()}/src/core" && pnpm jest --testPathPattern="${name}"`,
              );
              res();
            } catch (err) {
              res();
            }
          }),
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
})();

function parseObjectTypeInterfaces(object, objectTypeInterfacesName) {
  let result = `export interface ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }${objectTypeInterfacesName} { `;
  for (const key in object) {
    result += ` ${key}: ${object[key]}; `;
  }

  result += ' };';
  return result;
}

function parseMongo(mongoType, mongoKey, isMongoOptional, mongoProps) {
  let mongoschema = '';
  let required = `required:  ${isMongoOptional ? 'false' : 'true'}`;

  switch (mongoType) {
    case 'string':
      mongoschema = `${mongoKey}: { type: String, ${required} },`;
      break;
    case 'number':
      mongoschema = `${mongoKey}: { type: Number, ${required} },`;
      break;
    case 'string[]':
      mongoschema = `${mongoKey}: { type: [String], ${required} },`;
      break;
    case 'number[]':
      mongoschema = `${mongoKey}: { type: [Number], ${required} },`;
      break;
    case 'boolean':
      mongoschema = `${mongoKey}: { type: Boolean, ${required} },`;
      break;
    case 'Date':
      mongoschema = `${mongoKey}: { type: Date, ${required} },`;
      break;
    default:
      let mongosubschema = `${mongoKey}: {  `;

      for (let submongoKey in mongoProps[mongoKey]) {
        const subtype = mongoProps[mongoKey][submongoKey];
        let parsedSubMongoKey = submongoKey;

        const last_char_of_sub_mongoKey = submongoKey.slice(-1);
        let is_submongoKey_optional = false;

        if (last_char_of_sub_mongoKey === '?') {
          is_submongoKey_optional = true;
          parsedSubMongoKey = submongoKey.slice(0, -1);
        }

        const schema = parseMongo(
          subtype,
          parsedSubMongoKey,
          is_submongoKey_optional,
          mongoProps,
        );
        mongosubschema += `${schema}  `;
      }

      mongosubschema += `},`;
      mongoschema += mongosubschema;
      break;
  }

  return mongoschema;
}

function parseRandom(mainKey, rootKey, props, isObject) {
  let newType = ``;

  if (isObject) {
    newType = `${mainKey}: { `;
    for (let subkey in props[rootKey]) {
      newType += parseRandomSwitchCase(
        subkey,
        props[rootKey][subkey],
        isObject,
      );
    }
    newType += `},`;
  } else {
    newType = parseRandomSwitchCase(mainKey, props[rootKey]);
  }

  return newType;
}

function parseRandomSwitchCase(key, type, isObject) {
  let newType = `${key}: `;

  switch (type) {
    case 'string':
      newType += 'uuid(),';
      break;
    case 'number':
      newType += 'Math.floor(Math.random() * 101),';
      break;
    case 'string[]':
      newType += '[uuid()],';
      break;
    case 'number[]':
      newType += '[1, 2, 3],';
      break;
    case 'boolean':
      newType += 'true, ';
      break;
    case 'Date':
      newType += 'new Date(),';
      break;
  }

  return newType;
}
