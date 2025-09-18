import { useState, useEffect, useCallback } from "react";
import type { LeadStatus } from "../../types";
import {
  FilterStorageService,
  type FilterState,
} from "../../services/FilterStorageService";

export interface UseLeadFiltersReturn {
  search: string;
  status: LeadStatus | "All";
  setSearch: (search: string) => void;
  setStatus: (status: LeadStatus | "All") => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export function useLeadFilters(): UseLeadFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(() =>
    FilterStorageService.loadFilters()
  );

  // Save filters to localStorage whenever they change
  useEffect(() => {
    FilterStorageService.saveFilters(filters);
  }, [filters]);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setStatus = useCallback((status: LeadStatus | "All") => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const resetFilters = useCallback(() => {
    const defaultFilters = FilterStorageService.resetFilters();
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters = Boolean(
    filters.search.trim() || filters.status !== "All"
  );

  return {
    search: filters.search,
    status: filters.status,
    setSearch,
    setStatus,
    resetFilters,
    hasActiveFilters,
  };
}
