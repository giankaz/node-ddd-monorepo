export * from './translate';
import { ITranslations } from './types';
export type AppLanguages = 'pt' | 'en';

export type ILanguages = {
  [key in AppLanguages]: ITranslations;
};

export const languages: ILanguages = {
  en: {
    example: 'example',
    the_example: 'the example',
    not_found_error_message: '%s was not found',
    not_found_error_solution: 'check if the %s was succesfully created',
    status_must_be_active_inactive_deleted:
      'check if the status is active, inactive or deleted',
    x_is_required: '%s is required',
    name: 'name',
  },
  pt: {
    example: 'exemplo',
    the_example: 'o exemplo',
    not_found_error_message: '%s não encontrado',
    not_found_error_solution: 'verifique se %s foi criado com sucesso',
    status_must_be_active_inactive_deleted:
      'verifique se o status é ativo, inativo ou deletado',
    x_is_required: '%s é obrigatório',
    name: 'nome',
  },
};

export enum Translations {
  example = 'example',
  the_example = 'the_example',
  not_found_error_message = 'not_found_error_message',
  not_found_error_solution = 'not_found_error_solution',
  status_must_be_active_inactive_deleted = 'status_must_be_active_inactive_deleted',
  x_is_required = 'x_is_required',
  name = 'name',
}
