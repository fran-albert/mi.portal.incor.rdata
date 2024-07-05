"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditButton } from "@/components/Button/Edit/button";
import DeleteDoctorDialog from "../delete/DeleteDoctorDialog";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { formatDni, formatMatricula } from "@/common/helpers/helpers";
import { ViewButton } from "@/components/Button/View/button";

export const getColumns = (fetchDoctors: () => void): ColumnDef<Doctor>[] => {
  const columns: ColumnDef<Doctor>[] = [
    {
      accessorKey: "#",
      header: "#",
      cell: ({ row }) => {
        const index = row.index;
        return <div>{index + 1}</div>;
      },
    },
    {
      accessorKey: "firstName",
      header: "Médico",
      cell: ({ row }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() =>
            (window.location.href = `/usuarios/medicos/${row.original.userId}`)
          }
        >
          <Avatar>
            <AvatarImage
              src={
                row.original.photo
                  ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${row.original.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              alt="@username"
            />
            <AvatarFallback>
              {`${row.original.firstName.charAt(
                0
              )}${row.original.lastName.charAt(0)}`}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col ml-2">
            {" "}
            <p className="text-sm font-medium">
              {row.original.lastName}, {row.original.firstName}
            </p>
            <span
              style={{ fontSize: "0.75rem" }}
              className="text-teal-800 font-bold"
            >
              {row.original.email}
            </span>{" "}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "matricula",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {row.original.matricula
              ? formatMatricula(row.original.matricula)
              : "Sin matrícula"}
          </p>
        </div>
      ),
    },
    {
      header: "DNI",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">{formatDni(row.original.dni)}</p>
        </div>
      ),
    },
    // {
    //   accessorKey: "phoneNumber",
    //   header: "Teléfono",
    //   cell: ({ row }) => (
    //     <div className="flex items-center">
    //       <p className="text-sm font-medium">{row.original.phoneNumber}</p>
    //     </div>
    //   ),
    // },
    {
      header: "Especialidades",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {row.original.specialities.slice(0, 1).map((speciality, index) => (
              <span key={index}>
                {speciality.name}
                {index < 1 && row.original.specialities.length > 1 ? "" : ""}
              </span>
            ))}
            {row.original.specialities.length > 1 && "..."}
          </p>
        </div>
      ),
    },
    {
      header: " ",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <ViewButton
            id={row.original.userId}
            text="Ver Medico"
            path="medicos"
          />
          <DeleteDoctorDialog
            idDoctor={row.original.userId}
            onDoctorDeleted={fetchDoctors}
          />
        </div>
      ),
    },
  ];
  return columns;
};
