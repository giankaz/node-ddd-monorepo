import { Entity } from '../../../shared';
import { LeadModel } from '../models';

export class Lead extends Entity<LeadModel> implements LeadModel {
  constructor(props: LeadModel) {
    super(props, LeadModel);
  }

  get account_id(): string {
    return this.props.account_id;
  }

  set account_id(newAccount_id: string) {
    this.props.account_id = newAccount_id;
    this.update();
  }

  get document(): string {
    return this.props.document;
  }

  set document(newDocument: string) {
    this.props.document = newDocument;
    this.update();
  }

  get company_id(): string {
    return this.props.company_id;
  }

  set company_id(newCompany_id: string) {
    this.props.company_id = newCompany_id;
    this.update();
  }

  get email(): string {
    return this.props.email;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
    this.update();
  }

  get birth_date(): string {
    return this.props.birth_date;
  }

  set birth_date(newBirth_date: string) {
    this.props.birth_date = newBirth_date;
    this.update();
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(newPhone: string) {
    this.props.phone = newPhone;
    this.update();
  }

  get import_id(): string {
    return this.props?.import_id;
  }

  set import_id(newImport_id: string | null) {
    this.props.import_id = newImport_id;
    this.update();
  }

  get story_points(): number {
    return this.props.story_points;
  }

  set story_points(newStory_points: number) {
    this.props.story_points = newStory_points;
    this.update();
  }

  get origin(): string {
    return this.props?.origin;
  }

  set origin(newOrigin: string | null) {
    this.props.origin = newOrigin;
    this.update();
  }

  get is_opportunity(): boolean {
    return this.props?.is_opportunity;
  }

  set is_opportunity(newIs_opportunity: boolean | null) {
    this.props.is_opportunity = newIs_opportunity;
    this.update();
  }

  get user_id(): string {
    return this.props?.user_id;
  }

  set user_id(newUser_id: string | null) {
    this.props.user_id = newUser_id;
    this.update();
  }

  get state(): string {
    return this.props?.state;
  }

  set state(newState: string | null) {
    this.props.state = newState;
    this.update();
  }
}
