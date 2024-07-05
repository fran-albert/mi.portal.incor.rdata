import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/loading";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import { getAllSpecialities } from "@/modules/speciality/application/get-all/getAllSpecialities";
import AddSpecialityDialog from "@/components/Button/Add/Speciality/button";
// import EditSpecialityDialog from "../edit/EditHealthInsuranceDialog";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { getAll } from "@/modules/healthInsurance/application/get-all/getAllHealthInsurance";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import useRoles from "@/hooks/useRoles";
import AddHealthInsuranceDialog from "@/components/Button/Add/HealthInsurance/button";
import EditHealthInsuranceDialog from "../edit/EditHealthInsuranceDialog";

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
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Lista de Obras Sociales
            </h2>
            <div className="overflow-hidden sm:rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
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
  );
};
