import { getColumns } from "./columns";
import { Patient } from "@/types/Patient/Patient";
import useRoles from "@/hooks/useRoles";
import { DataTable } from "@/components/Table/table";
import { usePatients } from "@/hooks/Patient/usePatients";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
interface PatientTableProps {
  patients: Patient[];
  prefetchPatients: (id: number) => void;
  isLoading?: boolean;
}

export const PatientsTable: React.FC<PatientTableProps> = ({
  patients,
  isLoading,
  prefetchPatients,
}) => {
  const { isSecretary, isDoctor, isAdmin } = useRoles();

  const patientColumns = getColumns(prefetchPatients, {
    isSecretary,
    isDoctor,
    isAdmin,
  });
  const customFilterFunction = (patient: Patient, query: string) =>
    patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(query.toLowerCase()) ||
    patient.dni.toLowerCase().includes(query.toLowerCase());

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6 text-incor">
        Lista de Pacientes
      </h2>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/inicio">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/pacientes">Pacientes</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="overflow-hidden sm:rounded-lg ">
        <DataTable
          columns={patientColumns}
          data={patients}
          searchPlaceholder="Buscar pacientes..."
          showSearch={true}
          addLinkPath="pacientes/agregar"
          customFilter={customFilterFunction}
          addLinkText="Agregar Paciente"
          isLoading={isLoading}
          canAddUser={isSecretary}
        />
      </div>
    </div>
  );
};
