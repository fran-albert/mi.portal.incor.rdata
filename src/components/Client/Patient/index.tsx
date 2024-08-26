import { formatDateWithTime } from "@/common/helpers/helpers";
import PatientCardComponent from "@/sections/users/patients/View/Card/card";
import { Patient } from "@/types/Patient/Patient";
import useRoles from "@/hooks/useRoles";
import BreadcrumbComponent from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Study } from "@/types/Study/Study";
import StudiesComponent from "@/components/Studies/Component";
export function ClientPatientComponent({
  patient,
  studiesByUserId,
  urls,
  ultraSoundImages,
}: {
  patient: Patient | undefined;
  studiesByUserId: Study[];
  ultraSoundImages: { [key: number]: string[] };
  urls: Record<string, string>;
}) {
  const { isDoctor } = useRoles();
  const registerByText =
    patient?.registerBy?.firstName +
    " " +
    patient?.registerBy?.lastName +
    " " +
    "- " +
    formatDateWithTime(String(patient?.registrationDate));

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Pacientes", href: "/usuarios/pacientes" },
    {
      label: patient ? `${patient.firstName} ${patient.lastName}` : "Paciente",
      href: `/usuarios/pacientes/${patient?.slug}`,
    },
  ];

  return (
    <div className="container space-y-2 mt-2">
      <BreadcrumbComponent items={breadcrumbItems} />
      <div className="md:grid md:grid-cols-[320px_1fr] gap-6">
        {patient && (
          <PatientCardComponent patient={patient} registerBy={registerByText} />
        )}
        <div className="md:grid md:gap-6 space-y-4">
          {/* <StudiesCardComponent idUser={Number(patient?.userId)} /> */}
          <StudiesComponent
            idUser={Number(patient?.userId)}
            ultraSoundImages={ultraSoundImages}
            studiesByUserId={studiesByUserId}
            role="pacientes"
            urls={urls}
            slug={String(patient?.slug)}
          />
        </div>
      </div>
    </div>
  );
}
