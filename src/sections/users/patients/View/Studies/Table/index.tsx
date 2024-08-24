import React, { useState } from "react";
import { formatDate } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";
import { useStudy } from "@/hooks/Study/useStudy";
import Loading from "@/app/loading";
import { ViewButton } from "@/components/Button/View/button";
import { BsFillFileTextFill } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import { Study } from "@/types/Study/Study";
import StudyDialog from "../Dialog/dialog";
import DeleteStudyDialog from "../Delete/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StudiesPatientTableComponent = ({
  idUser,
  slug,
}: {
  idUser: number;
  slug: string;
}) => {
  const { isSecretary } = useRoles();
  const { studiesByUserId = [], isLoadingStudiesByUserId } = useStudy({
    idUser: idUser,
    fetchStudiesByUserId: true,
  });

  const { data: urls = {}, isLoading: isLoadingUrls } = useStudyUrls(
    idUser,
    studiesByUserId
  );

  const [selectedStudyType, setSelectedStudyType] = useState<string | null>(
    "Todos"
  );

  const groupStudiesByType = (studiesByUserId: Study[]) => {
    return studiesByUserId.reduce((acc, study) => {
      const name = study.studyType?.name;
      if (!name) return acc;
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(study);
      return acc;
    }, {} as Record<string, Study[]>);
  };

  const groupedStudies = groupStudiesByType(studiesByUserId);

  const filteredStudies = studiesByUserId.filter((study) => {
    return (
      selectedStudyType === "Todos" ||
      study.studyType?.name === selectedStudyType
    );
  });

  const studyTypes = ["Todos", ...Object.keys(groupedStudies)];

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-start">
          <CardTitle className="flex items-center text-incor">
            <BsFillFileTextFill className="mr-2" />
            Estudios Médicos
          </CardTitle>
          <Button variant="outline" className="ml-auto text-gray-900">
            <Link href={`/usuarios/pacientes/${slug}/laboratorios`}>Ver Tabla Laboratorios</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Filtrar por tipo de estudio
              </label>
              <Select
                onValueChange={setSelectedStudyType}
                value={selectedStudyType || ""}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Seleccione tipo de estudio" />
                </SelectTrigger>
                <SelectContent>
                  {studyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader className="sticky top-0 bg-white z-10 border-b">
              <TableRow className="bg-gray-100">
                <TableHead className="whitespace-nowrap w-[5%] text-center align-middle">
                  #
                </TableHead>
                <TableHead className="whitespace-nowrap w-[25%] text-left align-middle">
                  Tipo
                </TableHead>
                <TableHead className="whitespace-nowrap w-[35%] text-left align-middle">
                  Nota
                </TableHead>
                <TableHead className="whitespace-nowrap w-[20%] text-left align-middle">
                  Fecha
                </TableHead>
                <TableHead className="whitespace-nowrap w-[15%] text-left align-middle">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudies.length > 0 ? (
                filteredStudies.map((study, index) => (
                  <TableRow key={study.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-center align-middle">
                      {index + 1}
                    </TableCell>
                    <TableCell className="">
                      <span>{study.studyType?.name}</span>
                    </TableCell>
                    <TableCell className="items-center align-middle">
                      <span>{study.note}</span>
                    </TableCell>
                    <TableCell className="align-middle">
                      <span>{formatDate(String(study.date))}</span>
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex items-center gap-2">
                        <ViewButton url={urls[study.id]} text="Ver" />
                        {isSecretary && (
                          <DeleteStudyDialog
                            studies={studiesByUserId}
                            idStudy={study.id}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-gray-500 align-middle"
                  >
                    No hay estudios cargados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {isSecretary && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-center align-middle">
                    <StudyDialog idUser={idUser} />
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default StudiesPatientTableComponent;
