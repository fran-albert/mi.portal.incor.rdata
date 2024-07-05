import { Country } from "@/modules/country/domain/Country";

export interface State {
  id: number;
  name: string;
  country: Country;
}
