import { Body, Controller, Param, Query } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import {
  ActivateXxxxeclixxxxUseCase,
  CreateXxxxeclixxxxUseCase,
  DeleteXxxxeclixxxxUseCase,
  FindByIdXxxxeclixxxxUseCase,
  InactivateXxxxeclixxxxUseCase,
  ListXxxxeclixxxxsUseCase,
  SoftDeleteXxxxeclixxxxUseCase,
  UpdateXxxxeclixxxxUseCase,
  XxxxeclixxxxRepositoryInterface,
} from 'core';
import { AppLanguages } from 'translation';
import { Language } from '../../shared';
import {
  ActivateXxxxeclixxxxDecorator,
  CreateXxxxeclixxxxDecorator,
  DeleteXxxxeclixxxxDecorator,
  FindByIdXxxxeclixxxxDecorator,
  InactivateXxxxeclixxxxDecorator,
  ListXxxxeclixxxxsDecorator,
  SoftDeleteXxxxeclixxxxDecorator,
  UpdateXxxxeclixxxxDecorator,
} from '../decorators';
import { CreateXxxxeclixxxxDto, UpdateXxxxeclixxxxDto } from '../dtos';
import {
  XXXXECLIXXXX_ACTIVATED,
  XXXXECLIXXXX_CREATED,
  XXXXECLIXXXX_DELETED,
  XXXXECLIXXXX_INACTIVATED,
  XXXXECLIXXXX_SOFTDELETED,
  XXXXECLIXXXX_UPDATED,
} from '../xxxxeclixxxx.constants';

@Controller('xxxxeclixxxx')
@ApiTags('xxxxeclixxxx')
export class XxxxeclixxxxController {
  constructor(
    /*packages*/
    private readonly eventEmitter: EventEmitter2,

    /*usecases*/
    private readonly createUseCase: CreateXxxxeclixxxxUseCase.UseCase,
    private readonly findByIdUseCase: FindByIdXxxxeclixxxxUseCase.UseCase,
    private readonly listUseCase: ListXxxxeclixxxxsUseCase.UseCase,
    private readonly updateUseCase: UpdateXxxxeclixxxxUseCase.UseCase,
    private readonly deleteUseCase: DeleteXxxxeclixxxxUseCase.UseCase,
    private readonly softDeleteUseCase: SoftDeleteXxxxeclixxxxUseCase.UseCase,
    private readonly activateUseCase: ActivateXxxxeclixxxxUseCase.UseCase,
    private readonly inactivateUseCase: InactivateXxxxeclixxxxUseCase.UseCase,
  ) {}

  @CreateXxxxeclixxxxDecorator()
  public async create(
    @Body() body: CreateXxxxeclixxxxDto,
    @Language() language: AppLanguages,
  ): Promise<CreateXxxxeclixxxxUseCase.Output> {
    const output = await this.createUseCase.execute(body, {
      language,
    });

    const event = this.createUseCase.eventGenerated;

    this.eventEmitter.emit(XXXXECLIXXXX_CREATED, event);

    return output;
  }

  @ListXxxxeclixxxxsDecorator()
  public async list(
    @Language() language: AppLanguages,
    @Query() query: XxxxeclixxxxRepositoryInterface.XxxxeclixxxxSearchParams,
  ): Promise<ListXxxxeclixxxxsUseCase.Output> {
    const output = await this.listUseCase.execute(
      { params: query },
      {
        language,
      },
    );

    return output;
  }

  @FindByIdXxxxeclixxxxDecorator(':id')
  public async findById(
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<FindByIdXxxxeclixxxxUseCase.Output> {
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

  @UpdateXxxxeclixxxxDecorator(':id')
  public async update(
    @Body() body: UpdateXxxxeclixxxxDto,
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<UpdateXxxxeclixxxxUseCase.Output> {
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

    this.eventEmitter.emit(XXXXECLIXXXX_UPDATED, event);

    return output;
  }

  @ActivateXxxxeclixxxxDecorator('/activate/:id')
  public async activate(
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<ActivateXxxxeclixxxxUseCase.Output> {
    const output = await this.activateUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.activateUseCase.eventGenerated;

    this.eventEmitter.emit(XXXXECLIXXXX_ACTIVATED, event);

    return output;
  }

  @InactivateXxxxeclixxxxDecorator('/inactivate/:id')
  public async inactivate(
    @Language() language: AppLanguages,
    @Param('id') id: string,
  ): Promise<InactivateXxxxeclixxxxUseCase.Output> {
    const output = await this.inactivateUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.inactivateUseCase.eventGenerated;

    this.eventEmitter.emit(XXXXECLIXXXX_INACTIVATED, event);

    return output;
  }

  @DeleteXxxxeclixxxxDecorator('/hard/:id')
  public async delete(
    @Param('id') id: string,
    @Language() language: AppLanguages,
  ): Promise<DeleteXxxxeclixxxxUseCase.Output> {
    const output = await this.deleteUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.deleteUseCase.eventGenerated;

    this.eventEmitter.emit(XXXXECLIXXXX_DELETED, event);

    return output;
  }

  @SoftDeleteXxxxeclixxxxDecorator(':id')
  public async softDelete(
    @Param('id') id: string,
    @Language() language: AppLanguages,
  ): Promise<SoftDeleteXxxxeclixxxxUseCase.Output> {
    const output = await this.softDeleteUseCase.execute(
      {
        id,
      },
      {
        language,
      },
    );

    const event = this.softDeleteUseCase.eventGenerated;

    this.eventEmitter.emit(XXXXECLIXXXX_SOFTDELETED, event);

    return output;
  }
}
