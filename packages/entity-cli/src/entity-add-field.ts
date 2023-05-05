/* eslint-disable no-inner-declarations */
import * as fs from 'fs';
import prompts from 'prompts';
import { Props } from './models/props';
import { jsonAddFieldParser } from './parsers/json-parser';
import { addPropToEntity } from './tasks/add-prop-to-entity';
import { keyValidator } from './utils/keyValidator';

const props: Props = {};

export async function entityAddField(path: string, jsonPath?: string) {
  (async () => {
    if (!path) {
      const response = await prompts({
        type: 'text',
        name: 'entityPath',
        message: '🖊️  Enter the Entity Path: ',
      });

      path = response.entityPath;
    }

    if (!fs.existsSync(path)) {
      console.log('❗ Entity not found on given path ❗\n');
    } else {
      (async () => await addField(path, jsonPath))();
    }

    async function addField(path: string, jsonPath?: string) {
      async function prompt() {
        (async () => {
          const propsResponse = await prompts({
            type: 'text',
            name: 'prop',
            message:
              "🖊️  Enter the field name to add, if optional put a ? as last character.\n  ℹ️  Enter 's' to save and finish ✅\n  ℹ️  Enter 'q' to quit ❌ \n",
          });

          const prop = propsResponse.prop;

          if (prop === 's') {
            await addPropToEntity(path, props);
            return;
          }

          if (prop === 'q') {
            process.exit();
          }

          if (!keyValidator(prop)) {
            return await prompt();
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

                  if (!keyValidator(subprop)) {
                    return await promptSubprop();
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
        await jsonAddFieldParser(path, jsonPath);
      } else {
        await prompt();
      }
    }
  })();
}
