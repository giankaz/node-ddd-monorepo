import { Module } from '@nestjs/common';
import { CompanyController } from '../controllers';
import { CompanyEventListeners } from '../events';
import { COMPANY_PROVIDER } from '../providers';

@Module({
  imports: [],
  providers: [
    ...Object.values(COMPANY_PROVIDER.REPOSITORY),
    ...Object.values(COMPANY_PROVIDER.USE_CASES),
    CompanyEventListeners,
  ],
  controllers: [CompanyController],
})
export class CompanyModule {}
