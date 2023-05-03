import { LeadModel } from '../../domain';

export type ILead = Pick<LeadModel, keyof LeadModel>;
