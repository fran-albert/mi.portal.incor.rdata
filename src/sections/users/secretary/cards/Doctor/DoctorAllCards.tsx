"use client";
import Link from "next/link";
import { useEffect } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { useDoctorStore } from "@/hooks/useDoctors";
export const DoctorsCount = () => {
  const { fetchLastDoctors, fetchTotalDoctors, lastedDoctors, totalDoctors } =
    useDoctorStore();

  useEffect(() => {
    fetchTotalDoctors();
    fetchLastDoctors();
  }, [fetchTotalDoctors, fetchLastDoctors]);

  return (
    <>
      <div className="rounded-lg w-84 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
        <Link href={`/usuarios/medicos`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Médicos</CardTitle>
              <FaUserDoctor className="w-4 h-4" color="#0e7490" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDoctors}</div>
              <p className="text-xs text-muted-foreground">
                +{lastedDoctors} desde la semana pasada
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
