/* eslint-disable no-case-declarations */
import { Props } from '../models/props';

export function parseMongo(props: Props) {
  let mongoschema = '';
  const entriesProps = Object.entries(props);

  entriesProps.forEach(([key, value]) => {
    let parsedKey = key;
    let is_subkey_optional = false;
    const last_char_of_sub_key = key.slice(-1);
    const required = `required:  ${is_subkey_optional ? 'false' : 'true'}`;

    if (last_char_of_sub_key === '?') {
      is_subkey_optional = true;
      parsedKey = key.replace('?', '').replace('[]', '');
    }
    if (typeof value === 'object') {
      let subSchema = `${parsedKey}: { 
        type: {
        `;
      const schema = parseMongo(value);
      subSchema += `${schema} },
      ${required},
      _id: false,
         }, `;
      mongoschema += `${subSchema}\n`;
    } else {
      const schema = mongoSwitchCase(value, parsedKey, is_subkey_optional);
      mongoschema += `${schema}  `;
    }
    mongoschema;
  });

  return mongoschema;
}

function mongoSwitchCase(type: string, key: string, isOptional = false) {
  let mongoschema = '';
  const required = `required:  ${isOptional ? 'false' : 'true'}`;

  switch (type) {
    case 'string':
      mongoschema = `${key}: { type: String, ${required} },`;
      break;
    case 'number':
      mongoschema = `${key}: { type: Number, ${required} },`;
      break;
    case 'string[]':
      mongoschema = `${key}: { type: [String], ${required} },`;
      break;
    case 'number[]':
      mongoschema = `${key}: { type: [Number], ${required} },`;
      break;
    case 'boolean':
      mongoschema = `${key}: { type: Boolean, ${required} },`;
      break;
    case 'Date':
      mongoschema = `${key}: { type: Date, ${required} },`;
      break;
  }
  return mongoschema;
}
