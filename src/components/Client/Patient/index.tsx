import { formatDateWithTime } from "@/common/helpers/helpers";
import StudiesCardComponent from "@/sections/users/patients/View/Studies/card";
import PatientCardComponent from "@/sections/users/patients/View/Card/card";
import LabCard from "@/sections/users/patients/View/Lab/card";
import { Patient } from "@/types/Patient/Patient";
import useRoles from "@/hooks/useRoles";
import BreadcrumbComponent from "@/components/Breadcrumb";
export function ClientPatientComponent({
  patient,
}: {
  patient: Patient | undefined;
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
      <div className="md:grid md:grid-cols-[300px_1fr] gap-6">
        {patient && (
          <PatientCardComponent patient={patient} registerBy={registerByText} />
        )}
        <div className="md:grid md:gap-6 space-y-4">
          <StudiesCardComponent idUser={Number(patient?.userId)} />
          {isDoctor && <LabCard id={Number(patient?.userId)} />}
        </div>
      </div>
    </div>
  );
}
