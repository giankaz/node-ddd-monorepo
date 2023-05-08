import { Entity } from '../../../shared';
import { CompanyValidator } from '../validator';
import * as vo from '../../application/dto/value-objects.dto';

export class Company
  extends Entity<CompanyValidator>
  implements CompanyValidator
{
  constructor(props: CompanyValidator) {
    /*entitypresuper*/
    super(props, CompanyValidator);
  }

  /*getters*/
  get account_id(): string {
    return this.props.account_id;
  }

  set account_id(newAccount_id: string) {
    this.props.account_id = newAccount_id;
    this.update();
  }

  get document(): string {
    return this.props?.document;
  }

  set document(newDocument: string | null) {
    this.props.document = newDocument;
    this.update();
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(newPhone: string) {
    this.props.phone = newPhone;
    this.update();
  }

  get email(): string {
    return this.props.email;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
    this.update();
  }

  get lead_count(): number {
    return this.props.lead_count;
  }

  set lead_count(newLead_count: number) {
    this.props.lead_count = newLead_count;
    this.update();
  }
}
