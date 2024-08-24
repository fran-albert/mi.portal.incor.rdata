"use client";
import React, { useEffect } from "react";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { ClientPatientComponent } from "@/components/Client/Patient";
import { usePatient } from "@/hooks/Patient/usePatient";
import useAuth from "@/hooks/Auth/useAuth";
import { useParams, useSearchParams } from "next/navigation";
import BreadcrumbComponent from "@/components/Breadcrumb";
import { useLab } from "@/hooks/Labs/useLab";
import LabCard from "@/components/Laboratories/Card/card";

const PatientLaboratoriosPage = () => {
  const params = useParams();
  const slug = params.slug;
  const slugString = slug as string;
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);
  const slugParts = slugString.split("-");
  const id = parseInt(slugParts[slugParts.length - 1], 10);
  const { isLoading, patient, error } = usePatient({
    auth: !isLoadingAuth,
    id,
  });

  const { labsDetails, isLoadingLabsDetails } = useLab({
    fetchLabsDetails: true,
    idUser: id,
  });

  console.log(labsDetails, "labsDetails");

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Pacientes", href: "/usuarios/pacientes" },
    {
      label: patient ? `${patient.firstName} ${patient.lastName}` : "Paciente",
      href: `/usuarios/pacientes/${patient?.slug}`,
    },
    {
      label: "Laboratorios",
      href: `/usuarios/pacientes/${patient?.slug}/laboratorios`,
    },
  ];
  return (
    <>
      {error && (
        <div className="text-red-500">
          Hubo un error al cargar los laboratorios del paciente.
        </div>
      )}
      {(isLoading || isLoadingAuth || isLoadingLabsDetails) && (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loading isLoading={true} />
        </div>
      )}
      {!isLoading && !isLoadingAuth && !isLoadingLabsDetails && (
        <div className="container space-y-2 mt-2">
          <BreadcrumbComponent items={breadcrumbItems} />
          {<LabCard labsDetails={labsDetails} role="paciente"/>}
        </div>
      )}

    </>
  );
};

export default PatientLaboratoriosPage;
