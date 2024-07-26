import { getColumns } from "./columns";
import { useState } from "react";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import EditSpecialityDialog from "../edit/EditSpecialityDialog";
import useRoles from "@/hooks/useRoles";
import { useSpecialityStore } from "@/hooks/useSpeciality";
import { DataTable } from "@/components/Table/table";
import AddSpecialityDialog from "@/components/Button/Add/Speciality/button";

export const SpecialityTable = ({
  specialities,
}: {
  specialities: Speciality[];
}) => {
  const {
    addSpecialityToList,
    updateSpecialityInList,
    removeSpecialityFromList,
  } = useSpecialityStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSpeciality, setEditingSpeciality] = useState<Speciality | null>(
    null
  );
  const { isSecretary, isDoctor } = useRoles();
  const [isAddSpecialityDialogOpen, setIsAddSpecialityDialogOpen] =
    useState(false);
  const openAddSpecialityDialog = () => setIsAddSpecialityDialogOpen(true);

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

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6">
        Lista de Especialidades
      </h2>
      <div className="overflow-hidden sm:rounded-lg p-4 ">
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
  );
};
