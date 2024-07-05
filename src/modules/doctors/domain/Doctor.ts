import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { User } from "@/modules/users/domain/User";


export interface Doctor extends User {
  matricula: string;
  specialities: any[];
  healthInsurances: HealthInsurance[];
}
