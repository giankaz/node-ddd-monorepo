import { Entity } from '../../../shared';
import { ReportModel } from '../models';

export class Report extends Entity<ReportModel> implements ReportModel {
  constructor(props: ReportModel) {
    super(props, ReportModel);
  }

  get customers(): number {
    return this.props.customers;
  }

  set customers(newCustomers: number) {
    this.props.customers = newCustomers;
    this.update();
  }

  get conversions(): number {
    return this.props.conversions;
  }

  set conversions(newConversions: number) {
    this.props.conversions = newConversions;
    this.update();
  }

  get qualified_leads(): number {
    return this.props.qualified_leads;
  }

  set qualified_leads(newQualified_leads: number) {
    this.props.qualified_leads = newQualified_leads;
    this.update();
  }

  get opportunities(): number {
    return this.props.opportunities;
  }

  set opportunities(newOpportunities: number) {
    this.props.opportunities = newOpportunities;
    this.update();
  }

  get leads(): number {
    return this.props.leads;
  }

  set leads(newLeads: number) {
    this.props.leads = newLeads;
    this.update();
  }
}
