import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import { getAllSpecialities } from "@/modules/speciality/application/get-all/getAllSpecialities";
import AddSpecialityDialog from "@/components/Button/Add/Speciality/button";
// import EditSpecialityDialog from "../edit/EditHealthInsuranceDialog";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { getAll } from "@/modules/healthInsurance/application/get-all/getAllHealthInsurance";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import useRoles from "@/hooks/useRoles";
import EditHealthInsuranceDialog from "../edit/EditHealthInsuranceDialog";
import Loading from "@/app/loading";
import { DataTable } from "@/components/Table/table";
import AddHealthInsuranceDialog from "@/components/Button/Add/Health-Insurance/button";

export const HealthInsuranceTable = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingHealthInsurance, setEditingHealthInsurance] =
    useState<HealthInsurance | null>(null);
  const { isSecretary, isDoctor } = useRoles();
  const [isLoading, setIsLoading] = useState(true);
  const [healthInsurance, setHealthInsurance] = useState<HealthInsurance[]>([]);
  const healthInsuranceRepository = createApiHealthInsuranceRepository();
  const loadAllHealthInsurance = getAll(healthInsuranceRepository);
  const [isAddHealthInsuranceDialogOpen, setIsAddHealthInsuranceDialogOpen] =
    useState(false);
  const openAddHealthInsuranceDialog = () =>
    setIsAddHealthInsuranceDialogOpen(true);
  const fetchSpecialities = async () => {
    try {
      setIsLoading(true);
      const HealthInsuranceData = await loadAllHealthInsurance();
      setHealthInsurance(HealthInsuranceData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditHealthInsurance = (HealthInsurance: HealthInsurance) => {
    setEditingHealthInsurance(HealthInsurance);
    setIsEditDialogOpen(true);
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const customFilterFunction = (
    healthInsurance: HealthInsurance,
    query: string
  ) => healthInsurance.name.toLowerCase().includes(query.toLowerCase());

  const addHealthInsuranceToList = (newHealthInsurance: HealthInsurance) => {
    setHealthInsurance((currentHealthInsurances) => [
      ...currentHealthInsurances,
      newHealthInsurance,
    ]);
  };

  const updateHealthInsuranceInList = (
    updatedHealthInsurance: HealthInsurance
  ) => {
    setHealthInsurance((currentSpecialities) =>
      currentSpecialities.map((hc) =>
        hc.id === updatedHealthInsurance.id ? updatedHealthInsurance : hc
      )
    );
  };

  const removeHealthInsuranceFromList = (idHC: number) => {
    setHealthInsurance((currentHealthInsurances) =>
      currentHealthInsurances.filter(
        (healthInsurance) => Number(healthInsurance.id) !== idHC
      )
    );
  };

  const healthInsuranceColumns = getColumns(
    removeHealthInsuranceFromList,
    isDoctor,
    handleEditHealthInsurance
  );

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6">
        Lista de Obras Sociales
      </h2>
      <div className="overflow-hidden sm:rounded-lg p-4 ">
        <DataTable
          columns={healthInsuranceColumns}
          data={healthInsurance}
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
          onHealthInsuranceAdded={addHealthInsuranceToList}
        />
        {isEditDialogOpen && editingHealthInsurance && (
          <EditHealthInsuranceDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            healthInsurance={editingHealthInsurance}
            updateHealthInsuranceInList={updateHealthInsuranceInList}
          />
        )}
      </div>
    </div>
  );
};
