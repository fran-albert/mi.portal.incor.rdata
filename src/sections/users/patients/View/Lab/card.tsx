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
const LabCard = ({ id }: { id: number }) => {
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
          <LabPatientTable id={id} />
        </CardContent>
      </Card>
    </>
  );
};

export default LabCard;
