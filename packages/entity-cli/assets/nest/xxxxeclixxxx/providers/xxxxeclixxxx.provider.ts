import { getConnectionToken } from '@nestjs/mongoose';
import {
  ActivateXxxxeclixxxxUseCase,
  CreateXxxxeclixxxxUseCase,
  DeleteXxxxeclixxxxUseCase,
  FindByIdXxxxeclixxxxUseCase,
  DeactivateXxxxeclixxxxUseCase,
  ListXxxxeclixxxxsUseCase,
  SoftDeleteXxxxeclixxxxUseCase,
  UpdateXxxxeclixxxxUseCase,
  XxxxeclixxxxMongoRepository,
} from 'core';
import { Connection } from 'mongoose';

export namespace XXXXECLIXXXX_PROVIDER {
  export namespace REPOSITORY {
    export const XXXXECLIXXXX_REPOSITORY = {
      provide: XxxxeclixxxxMongoRepository,
      useFactory: (connection: Connection) => {
        return new XxxxeclixxxxMongoRepository(connection);
      },
      inject: [getConnectionToken('mongodb')],
    };
  }

  export namespace USE_CASES {
    export const CREATE_XXXXECLIXXXX_USE_CASE = {
      provide: CreateXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new CreateXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const DELETE_XXXXECLIXXXX_USE_CASE = {
      provide: DeleteXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new DeleteXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const FIND_BY_ID_XXXXECLIXXXX_USE_CASE = {
      provide: FindByIdXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new FindByIdXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const LIST_XXXXECLIXXXXS_USE_CASE = {
      provide: ListXxxxeclixxxxsUseCase.UseCase,
      useFactory: (repository) => {
        return new ListXxxxeclixxxxsUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const SOFT_DELETE_XXXXECLIXXXX_USE_CASE = {
      provide: SoftDeleteXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new SoftDeleteXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const UPDATE_XXXXECLIXXXX_USE_CASE = {
      provide: UpdateXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new UpdateXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const ACTIVATE_XXXXECLIXXXX_USE_CASE = {
      provide: ActivateXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new ActivateXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };

    export const DEACTIVATE_XXXXECLIXXXX_USE_CASE = {
      provide: DeactivateXxxxeclixxxxUseCase.UseCase,
      useFactory: (repository) => {
        return new DeactivateXxxxeclixxxxUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.XXXXECLIXXXX_REPOSITORY.provide],
    };
  }
}
