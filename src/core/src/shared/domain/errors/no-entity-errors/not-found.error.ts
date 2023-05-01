import { AbstractErrorStandardizationSubItem } from '../../../domain';

export const NoEntityNotFoundErrors = {
  ABSTRACT_ENTITY_NOT_FOUND: {
    entity: 'NE',
    id: '02',
    local: '00',
    message: {
      en: 'abstract entity not found',
      pt: 'entidade abstrata não encontrada',
    },
    name: 'ABSTRACT ENTITY NOT FOUND',
    solution: {
      en: 'check if the entity was successfully created',
      pt: 'verifique se a entidade foi criada com sucesso',
    },
  },
} satisfies AbstractErrorStandardizationSubItem;
