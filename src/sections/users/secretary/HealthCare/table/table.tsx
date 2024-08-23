import { getColumns } from "./columns";
import { useState } from "react";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import useRoles from "@/hooks/useRoles";
import EditHealthInsuranceDialog from "../edit/EditHealthInsuranceDialog";
import Loading from "@/app/loading";
import { DataTable } from "@/components/Table/table";
import AddHealthInsuranceDialog from "@/components/Button/Add/Health-Insurance/button";
import { useHealthInsurance } from "@/hooks/Health-Insurance/useHealthInsurance";

export const HealthInsuranceTable = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingHealthInsurance, setEditingHealthInsurance] =
    useState<HealthInsurance | null>(null);
  const { isSecretary, isDoctor } = useRoles();
  const { healthInsurances, isLoading } = useHealthInsurance({});
  const [isAddHealthInsuranceDialogOpen, setIsAddHealthInsuranceDialogOpen] =
    useState(false);
  const openAddHealthInsuranceDialog = () =>
    setIsAddHealthInsuranceDialogOpen(true);

  const handleEditHealthInsurance = (HealthInsurance: HealthInsurance) => {
    setEditingHealthInsurance(HealthInsurance);
    setIsEditDialogOpen(true);
  };
  const customFilterFunction = (
    healthInsurance: HealthInsurance,
    query: string
  ) => healthInsurance.name.toLowerCase().includes(query.toLowerCase());

  const healthInsuranceColumns = getColumns(
    isDoctor,
    handleEditHealthInsurance
  );

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6 text-incor">
        Lista de Obras Sociales
      </h2>
      <div className="overflow-hidden sm:rounded-lg p-4 ">
        <DataTable
          columns={healthInsuranceColumns}
          data={healthInsurances}
          searchPlaceholder="Buscar obra social..."
          showSearch={true}
          onAddClick={openAddHealthInsuranceDialog}
          searchColumn="name"
          addLinkPath=""
          addLinkText="Agregar Obra Social"
          customFilter={customFilterFunction}
          canAddUser={isSecretary}
        />
        <AddHealthInsuranceDialog
          isOpen={isAddHealthInsuranceDialogOpen}
          setIsOpen={setIsAddHealthInsuranceDialogOpen}
        />
        {isEditDialogOpen && editingHealthInsurance && (
          <EditHealthInsuranceDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            healthInsurance={editingHealthInsurance}
          />
        )}
      </div>
    </div>
  );
};
