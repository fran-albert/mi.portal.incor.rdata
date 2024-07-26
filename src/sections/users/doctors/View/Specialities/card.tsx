import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doctor } from "@/types/Doctor/Doctor";

const DoctorSpecialitiesComponent = ({ doctor }: { doctor: Doctor | null }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Especialidades</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {doctor?.specialities.map((speciality) => (
              <li
                className="flex items-center justify-between"
                key={speciality.id}
              >
                <span>{speciality.name}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default DoctorSpecialitiesComponent;
