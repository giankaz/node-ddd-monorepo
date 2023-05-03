import { Entity } from '../../../shared';
import { CompanyModel } from '../models';

export class Company extends Entity<CompanyModel> implements CompanyModel {
  constructor(props: CompanyModel) {
    super(props, CompanyModel);
  }

  get account_id(): string {
    return this.props.account_id;
  }

  set account_id(newAccount_id: string) {
    this.props.account_id = newAccount_id;
    this.update();
  }

  get email(): string {
    return this.props.email;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
    this.update();
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(newPhone: string) {
    this.props.phone = newPhone;
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
