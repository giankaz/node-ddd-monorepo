import { CommonStatus } from '../../../shared';
import { IXxxxeclixxxx } from './xxxxeclixxxx.dto';

export type XxxxeclixxxxInput = {
  status?: CommonStatus;
} & Omit<IXxxxeclixxxx, 'id' | 'created_at' | 'updated_at' | 'status'>;
