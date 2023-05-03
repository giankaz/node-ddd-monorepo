import { Lead } from '../entities';
import { LeadInput } from '../../application';

export class CreateLeadFactory {
  public static create(input: LeadInput): Lead {
    return new Lead(input);
  }
}
