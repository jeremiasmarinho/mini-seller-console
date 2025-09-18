import { useMemo } from "react";
import type { Lead } from "../../types";
import {
  LeadService,
  type LeadFilterCriteria,
  type LeadStatistics,
} from "../../services/LeadService";

export interface UseLeadDataReturn {
  filteredLeads: Lead[];
  statistics: LeadStatistics;
}

export function useLeadData(
  leads: Lead[],
  filters: LeadFilterCriteria,
  opportunitiesCount: number
): UseLeadDataReturn {
  const filteredLeads = useMemo(
    () => LeadService.filterLeads(leads, filters),
    [leads, filters]
  );

  const statistics = useMemo(
    () => LeadService.calculateStatistics(leads, opportunitiesCount),
    [leads, opportunitiesCount]
  );

  return {
    filteredLeads,
    statistics,
  };
}
