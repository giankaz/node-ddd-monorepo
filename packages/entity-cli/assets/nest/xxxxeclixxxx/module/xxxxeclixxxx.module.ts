import { Module } from '@nestjs/common';
import { XxxxeclixxxxController } from '../controllers';
import { XxxxeclixxxxEventListeners } from '../events';
import { XXXXECLIXXXX_PROVIDER } from '../providers';

@Module({
  imports: [],
  providers: [
    ...Object.values(XXXXECLIXXXX_PROVIDER.REPOSITORY),
    ...Object.values(XXXXECLIXXXX_PROVIDER.USE_CASES),
    XxxxeclixxxxEventListeners,
  ],
  controllers: [XxxxeclixxxxController],
})
export class XxxxeclixxxxModule {}
