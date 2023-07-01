/* eslint-disable no-case-declarations */
import { IParser } from '../interfaces/parser';
import { Props } from '../interfaces/props';

export class MongoParser implements IParser<string> {
  execute(props: Props): string {
    let mongoSchema = '';
    const entriesProps = Object.entries(props);

    entriesProps.forEach(([key, value]) => {
      let parsedKey = key;
      let is_sub_key_optional = false;
      const last_char_of_sub_key = key.slice(-1);
      const required = `required:  ${is_sub_key_optional ? 'false' : 'true'}`;

      if (last_char_of_sub_key === '?') {
        is_sub_key_optional = true;
        parsedKey = key.replace('?', '').replace('[]', '');
      }
      if (typeof value === 'object') {
        let subSchema = `${parsedKey}: { 
        type: {
        `;
        const schema = this.execute(value);
        subSchema += `${schema} },
      ${required},
      _id: false,
         }, `;
        mongoSchema += `${subSchema}\n`;
      } else {
        const schema = this.mongoSwitchCase(
          value,
          parsedKey,
          is_sub_key_optional,
        );
        mongoSchema += `${schema}  `;
      }
      mongoSchema;
    });

    return mongoSchema;
  }

  private mongoSwitchCase(type: string, key: string, isOptional = false) {
    let mongoSchema = '';
    const required = `required:  ${isOptional ? 'false' : 'true'}`;

    switch (type) {
      case 'string':
        mongoSchema = `${key}: { type: String, ${required} },`;
        break;
      case 'number':
        mongoSchema = `${key}: { type: Number, ${required} },`;
        break;
      case 'string[]':
        mongoSchema = `${key}: { type: [String], ${required} },`;
        break;
      case 'number[]':
        mongoSchema = `${key}: { type: [Number], ${required} },`;
        break;
      case 'boolean':
        mongoSchema = `${key}: { type: Boolean, ${required} },`;
        break;
      case 'Date':
        mongoSchema = `${key}: { type: Date, ${required} },`;
        break;
    }
    return mongoSchema;
  }
}
