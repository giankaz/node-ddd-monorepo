import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ActivateCompanyUseCase,
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  Event,
  InactivateCompanyUseCase,
  SoftDeleteCompanyUseCase,
  UpdateCompanyUseCase,
} from 'core';
import {
  COMPANY_ACTIVATED,
  COMPANY_CREATED,
  COMPANY_DELETED,
  COMPANY_INACTIVATED,
  COMPANY_SOFTDELETED,
  COMPANY_UPDATED,
} from '../company.constants';

@Injectable()
export class CompanyEventListeners {
  @OnEvent(COMPANY_CREATED, { async: true })
  async companyCreatedEvent(payload: Event<CreateCompanyUseCase.Output>) {
    // do something after company is created
  }

  @OnEvent(COMPANY_ACTIVATED, { async: true })
  async companyActivatedEvent(payload: Event<ActivateCompanyUseCase.Output>) {
    // do something after company is activated
  }

  @OnEvent(COMPANY_INACTIVATED, { async: true })
  async companyInactivatedEvent(
    payload: Event<InactivateCompanyUseCase.Output>,
  ) {
    // do something after company is inactivated
  }

  @OnEvent(COMPANY_UPDATED, { async: true })
  async companyUpdatedEvent(payload: Event<UpdateCompanyUseCase.Output>) {
    // do something after company is updated
  }

  @OnEvent(COMPANY_DELETED, { async: true })
  async companyDeletedEvent(payload: Event<DeleteCompanyUseCase.Output>) {
    // do something after company is deleted
  }

  @OnEvent(COMPANY_SOFTDELETED, { async: true })
  async companySoftDeletedEvent(
    payload: Event<SoftDeleteCompanyUseCase.Output>,
  ) {
    // do something after company is soft deleted
  }
}
