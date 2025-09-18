import type { OppRepo } from "../../app/ports/OppRepo";
import type { Opportunity } from "../../types";
import { wait } from "../../services/latency";

export class OppRepoMemory implements OppRepo {
  private data: Opportunity[] = [];

  async add(opp: Opportunity): Promise<void> {
    await wait(200);
    this.data.push(opp);
  }

  async list(): Promise<Opportunity[]> {
    await wait(100);
    return [...this.data];
  }
}
