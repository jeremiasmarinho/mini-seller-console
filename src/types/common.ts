/**
 * Common types and utilities for the application
 */

// Result type for error handling
export type Result<T, E = Error> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

// Repository operation results
export type RepositoryResult<T> = Promise<Result<T, string>>;

// Filter state interface
export interface FilterState {
  readonly search: string;
  readonly status: import("../types").LeadStatus | "All";
}

// Statistics interface
export interface LeadStatistics {
  readonly total: number;
  readonly qualified: number;
  readonly opportunities: number;
  readonly conversionRate: number;
}

// Component props interfaces
export interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: React.ReactNode;
  readonly colorScheme: "blue" | "emerald" | "purple" | "amber";
}

export interface ErrorStateProps {
  readonly title?: string;
  readonly message: string;
  readonly onRetry?: () => void;
}

export interface EmptyStateProps {
  readonly title: string;
  readonly message: string;
  readonly icon?: React.ReactNode;
}

// Event handler types
export type SaveLeadHandler = (data: {
  readonly id: string;
  readonly email: string;
  readonly status: import("../types").LeadStatus;
}) => Promise<void>;

export type ConvertLeadHandler = (lead: import("../types").Lead) => void;

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ReadonlyArray<T> = readonly T[];

// Local storage utilities
export interface StorageService<T> {
  load(): T | null;
  save(data: T): void;
  reset(): void;
}
