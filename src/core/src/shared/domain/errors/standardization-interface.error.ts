export interface ErrorData {
  id: string;
  entity: string;
  name: string;
  local: string;
  message: {
    pt: string;
    en: string;
  };
  solution: {
    pt: string;
    en: string;
  };
  code?: string;
  quantity?: number;
  language?: 'pt' | 'en';
}

export interface AbstractErrorStandardizationSubItem {
  [key: string]: ErrorData;
}

type ErrorStandardizationSubItem<Type> = {
  [Property in keyof Type]: ErrorData;
};

export interface ErrorStandardization<
  Validation,
  NotFound,
  Unauthorized,
  LimitCap,
  Configuration,
  Denied,
> {
  validation: ErrorStandardizationSubItem<Validation>;
  not_found: ErrorStandardizationSubItem<NotFound>;
  unauthorized: ErrorStandardizationSubItem<Unauthorized>;
  limit_cap: ErrorStandardizationSubItem<LimitCap>;
  configuration: ErrorStandardizationSubItem<Configuration>;
  denied: ErrorStandardizationSubItem<Denied>;
}
