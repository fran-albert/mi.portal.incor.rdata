"use client";
import React, { useEffect } from "react";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import useAuth from "@/hooks/Auth/useAuth";
import { useParams, useSearchParams } from "next/navigation";
import BreadcrumbComponent from "@/components/Breadcrumb";
import { useLab } from "@/hooks/Labs/useLab";
import { useDoctor } from "@/hooks/Doctor/useDoctor";
import LabCard from "@/components/Laboratories/Card/card";

const DoctorLaboratoriosPage = () => {
  const params = useParams();
  const slug = params.slug;
  const slugString = slug as string;
  const isLoadingAuth = useAuth([Role.MEDICO]);
  const slugParts = slugString.split("-");
  const id = parseInt(slugParts[slugParts.length - 1], 10);
  const { isLoading, doctor, error } = useDoctor({
    auth: !isLoadingAuth,
    id,
  });

  const { labsDetails, isLoadingLabsDetails } = useLab({
    fetchLabsDetails: true,
    idUser: id,
  });

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Médicos", href: "/usuarios/medicos" },
    {
      label: doctor ? `${doctor.firstName} ${doctor.lastName}` : "Médico",
      href: `/usuarios/medicos/${doctor?.slug}`,
    },
    {
      label: "Laboratorios",
      href: `/usuarios/medicos/${doctor?.slug}/laboratorios`,
    },
  ];
  return (
    <>
      {error && (
        <div className="text-red-500">
          Hubo un error al cargar los laboratorios del médico.
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
          {<LabCard labsDetails={labsDetails} role="médico" />}
        </div>
      )}
    </>
  );
};

export default DoctorLaboratoriosPage;
