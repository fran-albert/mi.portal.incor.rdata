import React, { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { LabPatientTable } from "./Table/table";
const LabCard = ({ id }: { id: number }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Laboratorios</CardTitle>
        </CardHeader>
        <CardContent>
          <LabPatientTable id={id} />
        </CardContent>
      </Card>
    </>
  );
};

export default LabCard;
