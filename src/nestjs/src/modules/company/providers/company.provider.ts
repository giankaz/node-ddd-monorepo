import { getConnectionToken } from '@nestjs/mongoose';
import {
  ActivateCompanyUseCase,
  CompanyMongoRepository,
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  FindByIdCompanyUseCase,
  InactivateCompanyUseCase,
  ListCompanysUseCase,
  SoftDeleteCompanyUseCase,
  UpdateCompanyUseCase,
} from 'core';
import { Connection } from 'mongoose';

export namespace COMPANY_PROVIDER {
  export namespace REPOSITORY {
    export const COMPANY_REPOSITORY = {
      provide: CompanyMongoRepository,
      useFactory: (connection: Connection) => {
        return new CompanyMongoRepository(connection);
      },
      inject: [getConnectionToken('mongodb')],
    };
  }

  export namespace USE_CASES {
    export const CREATE_COMPANY_USE_CASE = {
      provide: CreateCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new CreateCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const DELETE_COMPANY_USE_CASE = {
      provide: DeleteCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new DeleteCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const FIND_BY_ID_COMPANY_USE_CASE = {
      provide: FindByIdCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new FindByIdCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const LIST_COMPANYS_USE_CASE = {
      provide: ListCompanysUseCase.UseCase,
      useFactory: (repository) => {
        return new ListCompanysUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const SOFT_DELETE_COMPANY_USE_CASE = {
      provide: SoftDeleteCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new SoftDeleteCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const UPDATE_COMPANY_USE_CASE = {
      provide: UpdateCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new UpdateCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const ACTIVATE_COMPANY_USE_CASE = {
      provide: ActivateCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new ActivateCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };

    export const INACTIVATE_COMPANY_USE_CASE = {
      provide: InactivateCompanyUseCase.UseCase,
      useFactory: (repository) => {
        return new InactivateCompanyUseCase.UseCase(repository);
      },
      inject: [REPOSITORY.COMPANY_REPOSITORY.provide],
    };
  }
}
