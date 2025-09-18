import type { LeadStatus } from "../types";

export interface FilterState {
  search: string;
  status: LeadStatus | "All";
}

export class FilterStorageService {
  private static readonly STORAGE_KEY = "mini-seller-filters";

  /**
   * Loads filter state from localStorage
   */
  static loadFilters(): FilterState {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          search: typeof parsed.search === "string" ? parsed.search : "",
          status: this.isValidStatus(parsed.status) ? parsed.status : "All",
        };
      }
    } catch (error) {
      console.warn("Failed to load filters from localStorage:", error);
    }

    return this.getDefaultFilters();
  }

  /**
   * Saves filter state to localStorage
   */
  static saveFilters(filters: FilterState): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.warn("Failed to save filters to localStorage:", error);
    }
  }

  /**
   * Resets filters to default state
   */
  static resetFilters(): FilterState {
    const defaultFilters = this.getDefaultFilters();
    this.saveFilters(defaultFilters);
    return defaultFilters;
  }

  /**
   * Gets default filter state
   */
  private static getDefaultFilters(): FilterState {
    return {
      search: "",
      status: "All",
    };
  }

  /**
   * Validates if status is valid
   */
  private static isValidStatus(status: unknown): status is LeadStatus | "All" {
    const validStatuses: (LeadStatus | "All")[] = [
      "All",
      "New",
      "Contacted",
      "Qualified",
      "Unqualified",
    ];
    return (
      typeof status === "string" &&
      validStatuses.includes(status as LeadStatus | "All")
    );
  }
}
