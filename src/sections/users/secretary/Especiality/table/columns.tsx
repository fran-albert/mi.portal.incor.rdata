"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import DeleteSpecialityDialog from "../delete/DeleteSpecialityDialog";
import EditSpecialityDialog from "../edit/EditSpecialityDialog";
import { ViewButton } from "@/components/Button/View/button";
import { Button } from "@/components/ui/button";

export const getColumns = (
  removeSpecialityFromList: (idSpeciality: number) => void,
  isDoctor: boolean,
  onEditSpeciality: (speciality: Speciality) => void
): ColumnDef<Speciality>[] => {
  const columns: ColumnDef<Speciality>[] = [
    {
      accessorKey: "#",
      header: "#",
      cell: ({ row }) => {
        const index = row.index;
        return <div>{index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Especialidad",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      header: " ",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          {!isDoctor && (
            <>
              <Button
                onClick={() => onEditSpeciality(row.original)}
                className="bg-teal-700 hover:bg-teal-500"
              >
                Editar
              </Button>
              <DeleteSpecialityDialog
                speciality={row.original}
                removeSpecialityFromList={removeSpecialityFromList}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
