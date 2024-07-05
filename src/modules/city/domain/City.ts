import { State } from "@/modules/state/domain/State";

export interface City {
  id: string;
  name: string;
  state: State;
}
