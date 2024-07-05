import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/loading";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import AddSpecialityDialog from "@/components/Button/Add/Speciality/button";
import EditSpecialityDialog from "../edit/EditSpecialityDialog";
import useRoles from "@/hooks/useRoles";
import { useSpecialityStore } from "@/hooks/useSpeciality";

export const SpecialityTable = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSpeciality, setEditingSpeciality] = useState<Speciality | null>(
    null
  );
  const { isSecretary, isDoctor } = useRoles();
  const [isAddSpecialityDialogOpen, setIsAddSpecialityDialogOpen] =
    useState(false);
  const openAddSpecialityDialog = () => setIsAddSpecialityDialogOpen(true);

  const {
    specialities,
    isLoading,
    fetchSpecialities,
    addSpecialityToList,
    updateSpecialityInList,
    removeSpecialityFromList,
  } = useSpecialityStore();

  useEffect(() => {
    fetchSpecialities();
  }, [fetchSpecialities]);
  const handleEditSpeciality = (speciality: Speciality) => {
    setEditingSpeciality(speciality);
    setIsEditDialogOpen(true);
  };

  const specialityColumns = getColumns(
    removeSpecialityFromList,
    isDoctor,
    handleEditSpeciality
  );

  const customFilterFunction = (speciality: Speciality, query: string) =>
    speciality.name.toLowerCase().includes(query.toLowerCase());

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Lista de Especialidades
            </h2>
            <div className="overflow-hidden sm:rounded-lg">
              <DataTable
                columns={specialityColumns}
                data={specialities}
                searchPlaceholder="Buscar especialidad..."
                showSearch={true}
                onAddClick={openAddSpecialityDialog}
                customFilter={customFilterFunction}
                addLinkPath=""
                addLinkText="Agregar Especialidad"
                canAddUser={isSecretary}
              />
              <AddSpecialityDialog
                isOpen={isAddSpecialityDialogOpen}
                setIsOpen={setIsAddSpecialityDialogOpen}
                onSpecialityAdded={addSpecialityToList}
              />
              {isEditDialogOpen && editingSpeciality && (
                <EditSpecialityDialog
                  isOpen={isEditDialogOpen}
                  setIsOpen={setIsEditDialogOpen}
                  speciality={editingSpeciality}
                  updateSpecialityInList={updateSpecialityInList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
