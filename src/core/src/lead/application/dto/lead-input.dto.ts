import { ILead } from './lead.dto';

export type LeadInput = Omit<ILead, 'id'>;
