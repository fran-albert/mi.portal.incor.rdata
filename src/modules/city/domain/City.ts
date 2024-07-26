import { State } from "@/modules/state/domain/State";

export interface City {
  id: number;
  name: string;
  state: State;
}
