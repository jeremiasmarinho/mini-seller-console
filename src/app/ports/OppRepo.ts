import type { Opportunity } from "../../types";

export interface OppRepo {
  add(opp: Opportunity): Promise<void>;
  list(): Promise<Opportunity[]>;
}
