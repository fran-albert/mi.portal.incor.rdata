import React, { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { GiHypodermicTest } from "react-icons/gi";
import { LabPatientTable } from "./Table/table";
import { Lab } from "@/types/Lab/Lab";
const LabCard = ({ labsDetails }: { labsDetails: Lab[] | undefined }) => {
  console.log(labsDetails, "labsDetails");
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-incor">
            <GiHypodermicTest className="mr-2" />
            Laboratorios
          </CardTitle>
        </CardHeader>
        <CardContent>
          {labsDetails && labsDetails.length > 0 ? (
            <LabPatientTable labsDetails={labsDetails} />
          ) : (
            <p className="text-gray-500">
              No hay laboratorios disponibles para este paciente.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default LabCard;
