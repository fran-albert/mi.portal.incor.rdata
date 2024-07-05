"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Study } from "@/modules/study/domain/Study";
import { formatDate } from "@/common/helpers/helpers";
import { FaRegFilePdf } from "react-icons/fa";

export const getColumns = (urls: any): ColumnDef<Study>[] => {
  const columns: ColumnDef<Study>[] = [
    {
      accessorKey: "#",
      header: "#",
      cell: ({ row }) => {
        const index = row.index;
        return <div>{index + 1}</div>;
      },
    },
    {
      header: "Estudio",
      cell: ({ row }) => {
        return <div>{row.original.studyType?.name}</div>;
      },
    },
    {
      header: "Fecha",
      cell: ({ row }) => {
        return <div>{formatDate(String(row.original.date))}</div>;
      },
    },
    {
      header: "Archivo",
      cell: ({ row }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.open(urls[row.original.id], "_blank")}
          >
            <FaRegFilePdf className="w-6 h-6 mr-2 text-red-600" />
          </div>
        );
      },
    },
  ];
  return columns;
};
