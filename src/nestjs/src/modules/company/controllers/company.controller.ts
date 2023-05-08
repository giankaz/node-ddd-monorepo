import { Body, Controller, Param, Query } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import {
  ActivateCompanyUseCase,
  CompanyRepositoryInterface,
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  FindByIdCompanyUseCase,
  InactivateCompanyUseCase,
  ListCompanysUseCase,
  SoftDeleteCompanyUseCase,
  UpdateCompanyUseCase,
} from 'core';
import { AppLanguages } from 'translation';
import { Language } from '../../shared';
import {
  COMPANY_ACTIVATED,
  COMPANY_CREATED,
  COMPANY_DELETED,
  COMPANY_INACTIVATED,
  COMPANY_SOFTDELETED,
  COMPANY_UPDATED,
} from '../company.constants';
import {
  ActivateCompanyDecorator,
  CreateCompanyDecorator,
  DeleteCompanyDecorator,
  FindByIdCompanyDecorator,
  InactivateCompanyDecorator,
  ListCompanysDecorator,
  SoftDeleteCompanyDecorator,
  UpdateCompanyDecorator,
} from '../decorators';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(
    /*packages*/
    private readonly eventEmitter: EventEmitter2,

    /*usecases*/
    private readonly createUseCase: CreateCompanyUseCase.UseCase,
    private readonly findByIdUseCase: FindByIdCompanyUseCase.UseCase,
    private readonly listUseCase: ListCompanysUseCase.UseCase,
    private readonly updateUseCase: UpdateCompanyUseCase.UseCase,
    private readonly deleteUseCase: DeleteCompanyUseCase.UseCase,
    private readonly softDeleteUseCase: SoftDeleteCompanyUseCase.UseCase,
    private readonly activateUseCase: ActivateCompanyUseCase.UseCase,
    private readonly inactivateUseCase: InactivateCompanyUseCase.UseCase,
  ) {}

  @CreateCompanyDecorator()
  public async create(
    @Body() body: CreateCompanyDto,
    @Language() language: AppLanguages,
  ): Promise<CreateCompanyUseCase.Output> {
    const output = await this.createUseCase.execute(body, {
      language,
    });

    const event = this.createUseCase.eventGenerated;

    this.eventEmitter.emit(COMPANY_CREATED, event);

    return output;
  }

  @ListCompanysDecorator()
  public async list(
    @Language() language: AppLanguages,
    @Query() query: CompanyRepositoryInterface.CompanySearchParams,
  ): Promise<ListCompanysUseCase.Output> {
    const output = await this.listUseCase.execute(
      { params: query },
      {
        language,
      },
    );

    return output;
  }

  @FindByIdCompanyDecorator(':id')
  public async findById(
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<FindByIdCompanyUseCase.Output> {
    const output = await this.findByIdUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    return output;
  }

  @UpdateCompanyDecorator(':id')
  public async update(
    @Body() body: UpdateCompanyDto,
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<UpdateCompanyUseCase.Output> {
    const output = await this.updateUseCase.execute(
      {
        id,
        ...body,
      },
      {
        language,
      },
    );

    const event = this.updateUseCase.eventGenerated;

    this.eventEmitter.emit(COMPANY_UPDATED, event);

    return output;
  }

  @ActivateCompanyDecorator('/activate/:id')
  public async activate(
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<ActivateCompanyUseCase.Output> {
    const output = await this.activateUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.activateUseCase.eventGenerated;

    this.eventEmitter.emit(COMPANY_ACTIVATED, event);

    return output;
  }

  @InactivateCompanyDecorator('/inactivate/:id')
  public async inactivate(
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<InactivateCompanyUseCase.Output> {
    const output = await this.inactivateUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.inactivateUseCase.eventGenerated;

    this.eventEmitter.emit(COMPANY_INACTIVATED, event);

    return output;
  }

  @DeleteCompanyDecorator('/hard/:id')
  public async delete(
    @Param('id') id: string,
    @Language() language: AppLanguages,
  ): Promise<DeleteCompanyUseCase.Output> {
    const output = await this.deleteUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.deleteUseCase.eventGenerated;

    this.eventEmitter.emit(COMPANY_DELETED, event);

    return output;
  }

  @SoftDeleteCompanyDecorator(':id')
  public async softDelete(
    @Param('id') id: string,
    @Language() language: AppLanguages,
  ): Promise<SoftDeleteCompanyUseCase.Output> {
    const output = await this.softDeleteUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.softDeleteUseCase.eventGenerated;

    this.eventEmitter.emit(COMPANY_SOFTDELETED, event);

    return output;
  }
}
