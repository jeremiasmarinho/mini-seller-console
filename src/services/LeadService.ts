import type { Lead, LeadStatus } from "../types";

export interface LeadFilterCriteria {
  search: string;
  status: LeadStatus | "All";
}

export interface LeadStatistics {
  total: number;
  qualified: number;
  contacted: number;
  opportunities: number;
  conversionRate: number;
}

export class LeadService {
  /**
   * Filters leads based on search criteria
   */
  static filterLeads(leads: Lead[], criteria: LeadFilterCriteria): Lead[] {
    let filteredLeads = [...leads];

    // Apply search filter
    if (criteria.search.trim()) {
      const searchTerm = criteria.search.trim().toLowerCase();
      filteredLeads = filteredLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm) ||
          lead.company.toLowerCase().includes(searchTerm) ||
          lead.email.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (criteria.status !== "All") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.status === criteria.status
      );
    }

    // Sort by score (highest first)
    return filteredLeads.sort((a, b) => b.score - a.score);
  }

  /**
   * Calculates lead statistics
   */
  static calculateStatistics(
    leads: Lead[],
    opportunitiesCount: number
  ): LeadStatistics {
    const total = leads.length;
    const qualified = leads.filter(
      (lead) => lead.status === "Qualified"
    ).length;
    const contacted = leads.filter(
      (lead) => lead.status === "Contacted"
    ).length;
    const conversionRate =
      total > 0 ? Math.round((opportunitiesCount / total) * 100) : 0;

    return {
      total,
      qualified,
      contacted,
      opportunities: opportunitiesCount,
      conversionRate,
    };
  }

  /**
   * Validates lead data
   */
  static validateLead(lead: Partial<Lead>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!lead.name?.trim()) {
      errors.push("Name is required");
    }

    if (!lead.email?.trim()) {
      errors.push("Email is required");
    } else if (!this.isValidEmail(lead.email)) {
      errors.push("Invalid email format");
    }

    if (!lead.company?.trim()) {
      errors.push("Company is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
