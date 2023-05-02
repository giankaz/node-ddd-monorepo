const fs = require('fs');
const path = require('path');
const JsonToTs = require('json-to-ts');

const files = fs.readdirSync(path.resolve(__dirname, './locales'));

let typesToWrite = ``;
let pt = ``;
let en = ``;

files.forEach((file) => {
  const data = fs.readFileSync(path.resolve(__dirname, './locales', file));

  const lang = file.replace('.json', '');

  const obj = JSON.parse(data.toString());
  if (lang === 'en') {
    JsonToTs(obj, { rootName: 'Translations' }).forEach((type) => {
      typesToWrite += `export ${type.toString()}\n`;
    });
    en = data.toString();
  } else {
    pt = data.toString();
  }
});

const enTranslations = Object.keys(JSON.parse(en));
const ptTranslations = Object.keys(JSON.parse(pt));
if (enTranslations.length !== ptTranslations.length) {
  const missingKeys = [...enTranslations, ...ptTranslations].filter(
    (value, index, self) => {
      return self.indexOf(value) === index && self.lastIndexOf(value) === index;
    },
  );

  throw new Error(
    `Check if the following translations exists in all tranlation files: ${missingKeys
      .join(' - ')
      .trim()}.`,
  );
}

const objectsToWrite = `import { Translations } from './types';
export type AppLanguages = 'pt' | 'en';

export type Langs = {
  [key in AppLanguages]: Translations;
};

export const languages: Langs = {
  en: ${en},
  pt: ${pt},
};
`;

fs.writeFileSync(path.resolve(__dirname, 'src', 'types.ts'), typesToWrite, 'utf8');
fs.writeFileSync(path.resolve(__dirname, 'src', 'index.ts'), objectsToWrite, 'utf8');
