import { AbstractErrorStandardizationSubItem } from '../../../domain';

export const NoEntityValidationErrors = {
  INVALID_UUID: {
    entity: 'NE',
    id: '02',
    local: '00',
    message: {
      en: 'invalid uuid',
      pt: 'uuid inválido',
    },
    name: 'INVALID UUID',
    solution: {
      en: 'an invalid uuid was passed, call support for help',
      pt: 'um uuid inválido foi passado, chame o suporte para ajuda',
    },
  },
  ID_IS_REQUIRED: {
    entity: 'NE',
    id: '03',
    local: '00',
    message: {
      en: 'id is required',
      pt: 'id é obrigatório',
    },
    name: 'ID IS REQUIRED',
    solution: {
      en: 'check if you are passing the id',
      pt: 'verique se você está passando o id',
    },
  },
  INTERNAL_SERVER_ERROR: {
    entity: 'NE',
    id: '04',
    local: '00',
    message: {
      en: 'internal server error',
      pt: 'erro de servidor interno',
    },
    name: 'INTERNAL SERVER ERROR',
    solution: {
      en: 'call support for help',
      pt: 'chame o suporte para auxílio',
    },
  },
  PAGE_MUST_BE_AN_INTEGER: {
    entity: 'NE',
    id: '05',
    local: '01',
    message: {
      en: 'page must be an integer number',
      pt: 'a página deve ser um número inteiro',
    },
    name: 'PAGE MUST BE AN INTEGER',
    solution: {
      en: 'check if you are passing the page in the params, it should be an integer number',
      pt: 'verifique caso esteja passando a página nos parâmetros, ela deve ser um número inteiro',
    },
  },
  PER_PAGE_MUST_BE_AN_INTEGER: {
    entity: 'NE',
    id: '06',
    local: '01',
    message: {
      en: 'per page must be an integer number',
      pt: 'por página deve ser um número inteiro',
    },
    name: 'PER PAGE MUST BE AN INTEGER',
    solution: {
      en: 'check if you are passing the per page in the params, it should be an integer number',
      pt: 'verifique caso esteja passando por página nos parâmetros, ela deve ser um número inteiro',
    },
  },
  SORT_MUST_NOT_BE_EMPTY: {
    entity: 'NE',
    id: '07',
    local: '00',
    message: {
      en: 'sort must not be empty',
      pt: 'organizar não deve estar vazio',
    },
    name: 'SORT MUST NOT BE EMPTY',
    solution: {
      en: 'if you are passing sort in the params, check if it is not empty',
      pt: 'se você está passando organizar nos parâmetros, verifique que não esteja vazio',
    },
  },
  SORT_DIR_MUST_NOT_BE_EMPTY: {
    entity: 'NE',
    id: '08',
    local: '00',
    message: {
      en: 'sort direction must not be empty',
      pt: 'direção de organização não deve estar vazio',
    },
    name: 'SORT DIR MUST NOT BE EMPTY',
    solution: {
      en: 'if you are passing sort direction in the params, check if it is not empty',
      pt: 'se você está passando a direção de organização nos parâmetros, verifique que não esteja vazio',
    },
  },
  SEARCH_MUST_NOT_BE_EMPTY: {
    entity: 'NE',
    id: '09',
    local: '00',
    message: {
      en: 'search must not be empty',
      pt: 'a pesquisa não deve estar vazia',
    },
    name: 'SEARCH MUST NOT BE EMPTY',
    solution: {
      en: 'if you are passing search in the params, check if it is not empty',
      pt: 'se você está passando a pesquisa nos parâmetros, verifique que não esteja vazia',
    },
  },
  TYPE_IS_REQUIRED: {
    entity: 'NE',
    id: '10',
    local: '00',
    message: {
      en: 'type is required in the filter params',
      pt: 'o tipo é obrigatório no filtro dos parâmetros',
    },
    name: 'TYPE IS REQUIRED',
    solution: {
      en: 'if you are passing filter in the params, check if the type field is in it',
      pt: 'caso você esteja passando o filtro nos parâmetors, verifique para que o tipo esteja nele',
    },
  },
  COLUMN_IS_REQUIRED: {
    entity: 'NE',
    id: '11',
    local: '00',
    message: {
      en: 'column is required in the filter params',
      pt: 'a coluna é obrigatória no filtro dos parâmetros',
    },
    name: 'COLUMN IS REQUIRED',
    solution: {
      en: 'if you are passing filter in the params, check if the type field is in it',
      pt: 'caso você esteja passando o filtro nos parâmetors, verifique para que a coluna esteja nele',
    },
  },
  OPERATOR_IS_REQUIRED: {
    entity: 'NE',
    id: '12',
    local: '00',
    message: {
      en: 'operator is required in the filter params',
      pt: 'o operador é obrigatório no filtro dos parâmetros',
    },
    name: 'OPERATOR IS REQUIRED',
    solution: {
      en: 'if you are passing filter in the params, check if the operator field is in it',
      pt: 'caso você esteja passando o filtro nos parâmetors, verifique para que o operador esteja nele',
    },
  },
  VALUE_IS_REQUIRED: {
    entity: 'NE',
    id: '13',
    local: '00',
    message: {
      en: 'value is required in the filter params',
      pt: 'o valor é obrigatório no filtro dos parâmetros',
    },
    name: 'VALUE IS REQUIRED',
    solution: {
      en: 'if you are passing filter in the params, check if the value field is in it',
      pt: 'caso você esteja passando o filtro nos parâmetors, verifique para que o valor esteja nele',
    },
  },
} satisfies AbstractErrorStandardizationSubItem;
