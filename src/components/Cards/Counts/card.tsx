import { PatientCount } from "@/sections/users/secretary/cards/Patient/PatientAllCard";
import { DoctorsCount } from "@/sections/users/secretary/cards/Doctor/DoctorAllCards";
import { SpectialityCount } from "@/sections/users/secretary/cards/Spectiality/SpecialityAllCards";
import { HealthInsuranceCount } from "@/sections/users/secretary/cards/HealthInsurance/HealthInsuranceAllCard";
import useRoles from "@/hooks/useRoles";
import { StudiesCount } from "@/sections/users/secretary/cards/Studies/card";
import { LabsCount } from "@/sections/users/secretary/cards/Labs/card";
import { EcographyCount } from "@/sections/users/secretary/cards/Ecography/card";

interface CountsCardsProps {
  lastedPatients: number;
  totalPatients: number;
  lastedDoctors: number;
  totalDoctors: number;
  totalSpecialities: number;
  totalHealthInsurances: number;
  totalStudies: number;
  totalLabs: number;
  totalEcography: number;
}

export function CountsCards({
  lastedPatients,
  lastedDoctors,
  totalHealthInsurances,
  totalStudies,
  totalSpecialities,
  totalDoctors,
  totalPatients,
  totalEcography,
  totalLabs,
}: CountsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      <PatientCount
        lastedPatients={lastedPatients}
        totalPatients={totalPatients}
      />
      <DoctorsCount lastedDoctors={lastedDoctors} totalDoctors={totalDoctors} />
      <SpectialityCount totalSpecialities={totalSpecialities} />
      <HealthInsuranceCount totalHealthInsurance={totalHealthInsurances} />
      <StudiesCount totalStudies={totalStudies} />
      <LabsCount totalLabs={totalLabs}/>
      <EcographyCount totalEcography={totalEcography}/>
    </div>
  );
}
