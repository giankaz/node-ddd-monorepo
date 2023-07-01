import prompts from 'prompts';
import { boldLog } from '../utils/logger';

export class EntityPrompts {
  static async getName(): Promise<string> {
    return (
      await prompts(
        {
          type: 'text',
          name: 'entityName',
          message: '🖊️  Enter the entity name: ',
        },
        {
          onCancel: () => {
            boldLog('An entity needs a name to start 😞, finishing process.');
            process.exit();
          },
        },
      )
    ).entityName;
  }

  static async getPath(
    kind: 'core' | 'nest',
    isAddProp = false,
  ): Promise<string> {
    return (
      await prompts(
        {
          type: 'text',
          name: 'path',
          message: `🖊️  Enter the ${
            kind === 'core' ? 'Core Src' : 'Nest.js Modules'
          } ${isAddProp && 'entity'} path: `,
        },
        {
          onCancel: () => {
            boldLog(
              'An entity needs a place to open routes to the world 😞, finishing process.',
            );
            process.exit();
          },
        },
      )
    ).path;
  }

  static async deletePreviousFolderQuestion(
    kind: 'core' | 'nest',
  ): Promise<string> {
    return (
      await prompts([
        {
          type: 'select',
          name: 'yesOrNo',

          message: `❗ Folder of the ${
            kind === 'core' ? 'core entity' : 'Nest.js Module'
          } already exists ❗.\n  ❗ Do you wish to delete the previous folder and create a new entity from scratch?\n`,
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
      ])
    ).yesOrNo;
  }
}
