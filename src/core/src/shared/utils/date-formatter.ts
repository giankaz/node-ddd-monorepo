import { AppLanguages } from '../../../../../packages/translation_v1/dist';

export class DateFormatter {
  public static short(date: Date | string, locale: AppLanguages) {
    const lang = locale === 'en' ? 'en-US' : 'pt-BR';
    try {
      return new Intl.DateTimeFormat(lang, {
        dateStyle: 'short',
      }).format(new Date(date));
    } catch (err) {
      return date;
    }
  }

  public static full(date: Date | string, locale: AppLanguages) {
    const lang = locale === 'en' ? 'en-US' : 'pt-BR';
    try {
      return new Intl.DateTimeFormat(lang, {
        dateStyle: 'full',
      }).format(new Date(date));
    } catch (err) {
      return date;
    }
  }

  public static long(date: Date | string, locale: AppLanguages) {
    const lang = locale === 'en' ? 'en-US' : 'pt-BR';
    try {
      return new Intl.DateTimeFormat(lang, {
        dateStyle: 'long',
      }).format(new Date(date));
    } catch (err) {
      return date;
    }
  }

  public static medium(date: Date | string, locale: AppLanguages) {
    const lang = locale === 'en' ? 'en-US' : 'pt-BR';
    try {
      return new Intl.DateTimeFormat(lang, {
        dateStyle: 'medium',
      }).format(new Date(date));
    } catch (err) {
      return date;
    }
  }
}
