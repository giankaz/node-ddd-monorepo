import { Entity } from '../../../shared';
import { ImportationModel } from '../models';

export class Importation
  extends Entity<ImportationModel>
  implements ImportationModel
{
  constructor(props: ImportationModel) {
    super(props, ImportationModel);
  }

  get contact_total(): number {
    return this.props.contact_total;
  }

  set contact_total(newContact_total: number) {
    this.props.contact_total = newContact_total;
    this.update();
  }

  get account_id(): string {
    return this.props.account_id;
  }

  set account_id(newAccount_id: string) {
    this.props.account_id = newAccount_id;
    this.update();
  }

  get company_id(): string {
    return this.props.company_id;
  }

  set company_id(newCompany_id: string) {
    this.props.company_id = newCompany_id;
    this.update();
  }

  get emails_total(): number {
    return this.props.emails_total;
  }

  set emails_total(newEmails_total: number) {
    this.props.emails_total = newEmails_total;
    this.update();
  }
}
