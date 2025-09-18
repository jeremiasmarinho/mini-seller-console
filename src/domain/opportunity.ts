export type OppStage = "New" | "Negotiation" | "Won" | "Lost";

export interface Opportunity {
  id: string;
  name: string;
  accountName: string;
  stage: OppStage;
  amount?: number;
}
