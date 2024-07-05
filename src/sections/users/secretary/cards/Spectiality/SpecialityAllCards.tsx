"use client";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHospitalCross } from "react-icons/gi";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
const doctorRepository = createApiSpecialityRepository();

export const SpectialityCount = () => {
  const [totalSpectiality, setTotalSpeciality] = useState<number>(0);

  useEffect(() => {
    const fetchTotalDoctors = async () => {
      const total = await doctorRepository.getTotalSpecialities();
      setTotalSpeciality(total);
    };

    fetchTotalDoctors().catch(console.error);
  }, []);

  return (
    <Card
      className="rounded-lg sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer"
      onClick={() => {
        window.location.href = "/especialidades";
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Especialidades</CardTitle>
        <GiHospitalCross className="w-4 h-4" color="#b45309" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalSpectiality}</div>
      </CardContent>
    </Card>
  );
};
