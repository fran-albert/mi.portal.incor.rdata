"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { Button } from "@/components/ui/button";
import DeleteHealthInsuranceDialog from "../delete/DeleteHealthCareDialog";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { EditButtonIcon } from "@/components/Button/Edit/button";

export const getColumns = (
  removeHealthInsuranceFromList: (idHealthCare: number) => void,
  isDoctor: boolean,
  onEditHealthCare: (healthCare: HealthInsurance) => void
): ColumnDef<HealthInsurance>[] => {
  const columns: ColumnDef<HealthInsurance>[] = [
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
      header: "Obra Social",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      header: " ",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          {!isDoctor && (
            <>
              <EditButtonIcon
                onClick={() => onEditHealthCare(row.original)}
                className="mr-2"
              />
              <DeleteHealthInsuranceDialog
                healthInsurance={row.original}
                removeHealthInsuranceFromList={removeHealthInsuranceFromList}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
