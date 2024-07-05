"use client"
import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect } from "react";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import Loading from "@/components/Loading/loading";
import { useDoctorStore } from "@/hooks/useDoctors";
export const DoctorsTable = () => {
  const { doctors, isLoading, fetchDoctors } = useDoctorStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);
  const doctorColumns = getColumns(fetchDoctors);

  const customFilterFunction = (doctor: Doctor, query: string) =>
    doctor.firstName.toLowerCase().includes(query.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(query.toLowerCase()) ||
    doctor.dni.toLowerCase().includes(query.toLowerCase());

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mt-6">
        Lista de Médicos
      </h2>
      <div className="overflow-hidden sm:rounded-lg p-4 ">
        <DataTable
          columns={doctorColumns}
          data={doctors}
          searchPlaceholder="Buscar médicos..."
          showSearch={true}
          customFilter={customFilterFunction}
          searchColumn="firstName"
          addLinkPath="medicos/agregar"
          addLinkText="Agregar Médico"
        />
      </div>
    </>
  );
};
