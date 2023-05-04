/* eslint-disable no-inner-declarations */
import { execSync } from 'child_process';
import * as fs from 'fs';
import prompts from 'prompts';
import { Props } from './models/props';
import { generateFiles } from './tasks/generate-files';
import { jsonParser } from './parsers/json-parser';

const scriptPath = __filename;
const props: Props = {};
const currentDir = scriptPath.split('/').slice(0, -1).join('/');
const assetDir = `${currentDir}/assets/example`;
let outputDir = `${process.cwd()}/src/core/src/`;
let name = '';

export async function entityGenerator(
  entityName?: string,
  path?: string,
  jsonPath?: string,
) {
  (async () => {
    if (!entityName) {
      const response = await prompts({
        type: 'text',
        name: 'entityName',
        message: '🖊️  Enter the entity name: ',
      });

      name = response.entityName;
    } else {
      name = entityName;
    }

    if (path) {
      outputDir = `${path}/${name}`;
    } else {
      outputDir += name;
    }

    if (fs.existsSync(outputDir)) {
      (async () => {
        const { yesOrNo } = await prompts([
          {
            type: 'select',
            name: 'yesOrNo',

            message:
              '❗ Folder of the entity already exists ❗.\n  ❗ Do you wish to delete the previous folder and create a new entity from scratch?\n',
            choices: [
              {
                title: '❗ Yes (it will delete the previous entity) ❗\n',
                value: 'yes',
              },
              {
                title: 'No (it will cancel the entity creation process) ✋',
                value: 'no',
              },
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
        (async () => await createEntity(jsonPath))();
      })();
    } else {
      (async () => await createEntity(jsonPath))();
    }

    async function createEntity(jsonPath?: string) {
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
            await generateFiles(name, assetDir, outputDir, props);
            return;
          }

          if (prop === 'q') {
            process.exit();
          }

          (async () => {
            const typeRes = await prompts([
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
            ]);

            const type = typeRes.type;

            if (type === 'object') {
              let obj: Props = {};

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

                  (async () => {
                    const responseType = await prompts([
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
                    ]);
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
      if (jsonPath) {
        await jsonParser(jsonPath, name, assetDir, outputDir);
      } else {
        await prompt();
      }
    }
  })();
}
