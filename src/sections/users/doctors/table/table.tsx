import { getColumns } from "./columns";
import { Doctor } from "@/types/Doctor/Doctor";
import { DataTable } from "@/components/Table/table";
import useRoles from "@/hooks/useRoles";
import BreadcrumbComponent from "@/components/Breadcrumb";

interface DoctorsTableProps {
  doctors: Doctor[];
  prefetchDoctors: (id: number) => void;
  isLoading?: boolean;
}

export const DoctorsTable: React.FC<DoctorsTableProps> = ({
  doctors,
  isLoading,
  prefetchDoctors,
}) => {
  const customFilterFunction = (doctor: Doctor, query: string) =>
    doctor.firstName.toLowerCase().includes(query.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(query.toLowerCase()) ||
    doctor.dni.toLowerCase().includes(query.toLowerCase());
  const { isSecretary, isDoctor, isAdmin } = useRoles();

  const doctorColumns = getColumns(prefetchDoctors, {
    isSecretary,
    isDoctor,
    isAdmin,
  });
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Médicos", href: "/usuarios/medicos" },
  ];

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6 text-incor">
        Lista de Médicos
      </h2>
      <BreadcrumbComponent items={breadcrumbItems} />
      <div className="overflow-hidden sm:rounded-lg">
        <DataTable
          columns={doctorColumns}
          data={doctors}
          searchPlaceholder="Buscar médicos..."
          showSearch={true}
          customFilter={customFilterFunction}
          searchColumn="firstName"
          addLinkPath="medicos/agregar"
          isLoading={isLoading}
          addLinkText="Agregar Médico"
          canAddUser={isSecretary || isAdmin}
        />
      </div>
    </div>
  );
};
