import React, { useState } from "react";
import { formatDate } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { ViewButton } from "@/components/Button/View/button";
import { BsFillFileTextFill } from "react-icons/bs";
import { Study } from "@/types/Study/Study";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StudyTypeSelect } from "@/components/Select/Study/By-Type/select";
import { StudyYearSelect } from "@/components/Select/Study/By-Year/select";
import DeleteStudyDialog from "../Delete/dialog";
import StudyDialog from "../Upload/dialog";
import { FaRegFilePdf, FaRegImage } from "react-icons/fa";
import StudiesTable from "../Table";
const StudiesComponent = ({
  studiesByUserId,
  idUser,
  urls,
  slug,
  role,
}: {
  studiesByUserId: Study[];
  idUser?: number;
  slug?: string;
  role?: string;
  urls: any;
}) => {
  const { isDoctor } = useRoles();
  const [selectedStudyType, setSelectedStudyType] = useState<string | null>(
    "Seleccionar tipo de estudio..."
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(
    "Seleccionar año..."
  );

  const groupStudiesByType = (studiesByUserId: Study[]) => {
    if (!Array.isArray(studiesByUserId)) {
      return {}; // o algún valor por defecto
    }

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

  const groupStudiesByYear = (studiesByUserId: Study[]) => {
    return studiesByUserId?.reduce((acc, study) => {
      if (!study.date) {
        return acc;
      }

      const year = new Date(study.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(study);
      return acc;
    }, {} as Record<string, Study[]>);
  };

  const groupedStudies = groupStudiesByType(studiesByUserId);
  const groupedYears = groupStudiesByYear(studiesByUserId);

  const filteredStudies = studiesByUserId.filter((study) => {
    const matchesType =
      selectedStudyType === "Seleccionar tipo de estudio..." ||
      study.studyType?.name === selectedStudyType;

    const matchesYear =
      selectedYear === "Seleccionar año..." ||
      (study.date &&
        new Date(study.date).getFullYear().toString() === selectedYear);

    return matchesType && matchesYear;
  });

  const studyTypes = [
    "Seleccionar tipo de estudio...",
    ...Object.keys(groupedStudies),
  ];
  const studyYears = ["Seleccionar año...", ...Object.keys(groupedYears)];

  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="flex items-center text-incor">
          <BsFillFileTextFill className="mr-2" />
          Estudios Médicos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isDoctor && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <StudyTypeSelect
              studyTypes={studyTypes}
              selectedStudyType={selectedStudyType}
              onStudyTypeChange={setSelectedStudyType}
            />
            <StudyYearSelect
              years={studyYears}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
            <Button variant="outline">
              <Link
                className="text-gray-600 hover:text-gray-800"
                href={`/usuarios/${role}/${slug}/laboratorios`}
              >
                Ver Tabla Laboratorios
              </Link>
            </Button>
          </div>
        )}
        <StudiesTable
          studiesByUserId={filteredStudies}
          idUser={Number(idUser)}
          urls={urls}
        />
      </CardContent>
    </Card>
  );
};

export default StudiesComponent;
