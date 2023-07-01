export * from './translate';
export * from './types';
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
    not_found_error_solution: 'check if the %s was successfully created',
    status_must_be_active_inactive_deleted:
      'check if the status is active, inactive or deleted',
    x_is_required: '%s is required',
    name: 'name',
    subscription: 'subscription',
    plan: 'plan',
    the_plan: 'the plano',
    account: 'account',
    the_account: 'the account',
    benefits: 'benefits',
    value: 'value',
    version: 'version',
    plan_version: 'plan version',
    expires_at: 'expires at',
    kind: 'kind',
    user: 'user',
    the_user: 'the user',
    already_exists_error_message: '%s already exists',
    already_exists_error_solution: 'check if the data passed is correct',
    not_accepted_file_type_error_message:
      'file type not accepted, accepted file type: %s',
    file_not_found: 'file not found',
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
    subscription: 'assinatura',
    plan: 'plano',
    the_plan: 'o plano',
    account: 'conta',
    the_account: 'a conta',
    benefits: 'benefícios',
    value: 'valor',
    version: 'versão',
    plan_version: 'versão do plano',
    expires_at: 'expira em',
    kind: 'tipo',
    user: 'usuário',
    the_user: 'o usuário',
    already_exists_error_message: '%s já existe',
    already_exists_error_solution:
      'verifique se os dados passados estão corretos',
    not_accepted_file_type_error_message:
      'formato de arquivo não suportado, formatos aceitos: %s',
    file_not_found: 'arquivo não encontrado',
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
  subscription = 'subscription',
  plan = 'plan',
  the_plan = 'the_plan',
  account = 'account',
  the_account = 'the_account',
  benefits = 'benefits',
  value = 'value',
  version = 'version',
  plan_version = 'plan_version',
  expires_at = 'expires_at',
  kind = 'kind',
  user = 'user',
  the_user = 'the_user',
  already_exists_error_message = 'already_exists_error_message',
  already_exists_error_solution = 'already_exists_error_solution',
  not_accepted_file_type_error_message = 'not_accepted_file_type_error_message',
  file_not_found = 'file_not_found',
}
