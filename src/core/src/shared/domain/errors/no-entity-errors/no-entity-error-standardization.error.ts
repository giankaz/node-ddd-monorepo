import { ErrorStandardization } from '../../../domain';
import { NoEntityConfigurationErrors } from './configuration.error';
import { NoEntityDeniedErrors } from './denied.errors';
import { NoEntityLimitCapErrors } from './limit-cap.error';
import { NoEntityNotFoundErrors } from './not-found.error';
import { NoEntityUnauthorizedErrors } from './unauthorized.error';
import { NoEntityValidationErrors } from './validation.error';

export const NoEntityErrorStandardization: ErrorStandardization<
  typeof NoEntityValidationErrors,
  typeof NoEntityNotFoundErrors,
  typeof NoEntityUnauthorizedErrors,
  typeof NoEntityLimitCapErrors,
  typeof NoEntityConfigurationErrors,
  typeof NoEntityDeniedErrors
> = {
  validation: NoEntityValidationErrors,
  not_found: NoEntityNotFoundErrors,
  unauthorized: NoEntityUnauthorizedErrors,
  limit_cap: NoEntityLimitCapErrors,
  configuration: NoEntityConfigurationErrors,
  denied: NoEntityDeniedErrors,
};
