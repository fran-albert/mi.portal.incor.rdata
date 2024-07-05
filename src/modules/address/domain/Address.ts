import { City } from "@/modules/city/domain/City";

export interface Address {
  id: number;
  street: string;
  number: string;
  description: string;
  phoneNumber: string;
  city: City;
}
