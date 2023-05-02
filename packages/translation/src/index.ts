import { Translations } from './types';
export type AppLanguages = 'pt' | 'en';

export type Langs = {
  [key in AppLanguages]: Translations;
};

export const languages: Langs = {
  en: {
    sent: 'sent',
  },
  pt: {
    sent: 'Enviado',
  },
};
