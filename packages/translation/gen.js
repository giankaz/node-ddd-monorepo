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
    JsonToTs(obj, { rootName: 'ITranslations' }).forEach((type) => {
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
    `Check if the following translations exists in all translation files: ${missingKeys
      .join(' - ')
      .trim()}.`,
  );
}

let translationEnum = ``

enTranslations.forEach((trans) => {
  translationEnum += `${trans} = '${trans}', \n`
})


const objectsToWrite = `export * from './translate';
export * from './types';
import { ITranslations } from './types';
export type AppLanguages = 'pt' | 'en';

export type ILanguages = {
  [key in AppLanguages]: ITranslations;
};

export const languages: ILanguages = {
  en: ${en},
  pt: ${pt},
};

export enum Translations {
  ${translationEnum}
}
`;

fs.writeFileSync(path.resolve(__dirname, 'src', 'types.ts'), typesToWrite, 'utf8');
fs.writeFileSync(path.resolve(__dirname, 'src', 'index.ts'), objectsToWrite, 'utf8');
