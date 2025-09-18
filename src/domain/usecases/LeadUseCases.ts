import type { Lead } from "../../types";
import type { LeadRepository, UpdateLeadRequest } from "../repositories";
import { LeadService } from "../../services/LeadService";

export class UpdateLeadUseCase {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  async execute(id: string, request: UpdateLeadRequest): Promise<Lead> {
    // Validate request
    const validation = LeadService.validateLead({
      email: request.email,
      name: "temp", // We don't update name in this use case
      company: "temp", // We don't update company in this use case
    });

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    // Update lead
    const updatedLead = await this.leadRepository.update(id, request);

    return updatedLead;
  }
}

export class GetAllLeadsUseCase {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  async execute(): Promise<Lead[]> {
    return await this.leadRepository.findAll();
  }
}

export class GetLeadByIdUseCase {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  async execute(id: string): Promise<Lead | null> {
    if (!id.trim()) {
      throw new Error("Lead ID is required");
    }

    return await this.leadRepository.findById(id);
  }
}
