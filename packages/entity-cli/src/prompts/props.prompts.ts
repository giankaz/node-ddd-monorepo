import prompts from 'prompts';
import { PropsTypes } from '../interfaces/types';

export class PropsPrompts {
  static async getName(): Promise<string> {
    return (
      await prompts({
        type: 'text',
        name: 'prop',
        message:
          "🖊️  Enter the field name, if optional put a ? as last character.\n  ℹ️  Enter 's' to save and finish ✅\n  ℹ️  Enter 'q' to quit ❌ \n",
      })
    ).prop;
  }

  static async getType(prop: string): Promise<PropsTypes> {
    return (
      await prompts([
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
      ])
    ).type;
  }

  static async getSubPropFieldName(prop: string) {
    return (
      await prompts({
        type: 'text',
        name: 'subProp',
        message: `🖊️  Enter the ${prop} sub field name, if optional put a ? as last character.\n  ℹ️  Enter 's' to save and finish ✅\n  ℹ️  Enter 'q' to quit entity creation ❌ \n  ℹ️  Enter 'r' to reset sub fields 🔄 \n  ℹ️  Enter 'b' to return to entity without saving object 🔙 \n`,
      })
    ).subProp;
  }
}
