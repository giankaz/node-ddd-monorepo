import { AppLanguages, languages } from './';
import { ITranslations } from './types';

export function translate(
  /**
   * @param {AppLanguages}
   */
  language: AppLanguages,
  /**
   * @param {ITranslations}
   */
  sentence: keyof ITranslations,
  /**
   * replaces the %s in the sentences for the args in order
   * @param {string[]}
   */
  ...args: string[]
) {
  let index = 0;
  if (sentence in languages[language]) {
    return languages[language][sentence].replace(/%s/g, () =>
      String(args[index++]),
    );
  }
  return sentence;
}
