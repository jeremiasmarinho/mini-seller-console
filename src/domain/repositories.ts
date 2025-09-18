import type { Lead, LeadStatus, Opportunity } from "../types";

export interface UpdateLeadRequest {
  email: string;
  status: LeadStatus;
}

export interface LeadRepository {
  findAll(): Promise<Lead[]>;
  findById(id: string): Promise<Lead | null>;
  update(id: string, data: UpdateLeadRequest): Promise<Lead>;
  delete(id: string): Promise<void>;
}

export interface OpportunityRepository {
  findAll(): Promise<Opportunity[]>;
  createFromLead(lead: Lead): Promise<Opportunity>;
}

export interface RepositoryContainer {
  leadRepository: LeadRepository;
  opportunityRepository: OpportunityRepository;
}
