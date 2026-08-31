import type { BillsFilters } from "../../types";

export interface BillsFiltersProps {
  filters: BillsFilters;
  categories: string[];
  onChange: (filters: BillsFilters) => void;
}
