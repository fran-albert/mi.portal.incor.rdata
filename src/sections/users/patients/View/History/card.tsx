import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/modules/users/domain/User";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import Loading from "@/components/Loading/loading";
import { FaEdit, FaPlus, FaUpload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useRoles from "@/hooks/useRoles";
import HistoryDialog from "./Dialog/dialog";

const HistoryCardComponent = () => {
  const antecedentes = [
    {
      nombre: "Antecedente 1",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 2",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 4",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 5",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 3",
      fecha: "01/01/2021",
    },
  ];

  return (
    <>
      {/* <Card>
        <CardHeader>
          <CardTitle>Antecedentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {antecedentes.length > 0 ? (
              <ul>
                {antecedentes.map((antecedente, index) => (
                  <div
                    key={index}
                    className="p-4 my-2 cursor-pointer hover:bg-gray-100  flex justify-between items-center"
                  >
                    <div>
                      <p className="text-black font-semibold mb-1">
                        {antecedente.nombre}
                      </p>
                      <p className="text-black text-xs">{antecedente.fecha}</p>
                      <p className="text-black text-xs">
                        Prestador: Dr. Nombre Apellido
                      </p>
                    </div>
                    <button className="ml-4 text-gray-500 hover:text-gray-700">
                      <FaEdit className="w-4 h-4 text-teal-600" />
                    </button>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-700 p-2">
                No hay antecedentes cargados.
              </div>
            )}
          </div>
          <div className="mt-4">
            <HistoryDialog
            // idPatient={idPatient}
            // onStudyAdded={onStudyAdded}
            />
          </div>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader>
          <CardTitle>Antecedentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Diagnostico</TableHead>
                <TableHead>Médico</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>Diabetes tipo 2</TableCell>
                <TableCell>Dr. María Gómez</TableCell>
                <TableCell>2022-05-15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>María Rodríguez</TableCell>
                <TableCell>Hipertensión arterial</TableCell>
                <TableCell>Dr. José Hernández</TableCell>
                <TableCell>2021-08-20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carlos Sánchez</TableCell>
                <TableCell>Asma</TableCell>
                <TableCell>Dra. Lucía Fernández</TableCell>
                <TableCell>2020-11-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ana Torres</TableCell>
                <TableCell>Artritis reumatoide</TableCell>
                <TableCell>Dr. Miguel Ángel Díaz</TableCell>
                <TableCell>2019-03-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pedro Gómez</TableCell>
                <TableCell>Depresión</TableCell>
                <TableCell>Dra. Sofía Ramírez</TableCell>
                <TableCell>2018-09-10</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-auto">
            <HistoryDialog />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default HistoryCardComponent;
