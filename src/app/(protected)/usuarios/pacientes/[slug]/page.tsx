"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { ClientPatientComponent } from "@/components/Client/Patient";
import { usePatient } from "@/hooks/Patient/usePatient";
import useAuth from "@/hooks/Auth/useAuth";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const PatientPage = () => {
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

  return (
    <>
      {error && <div>Hubo un error al cargar los pacientes.</div>}
      {isLoading || isLoadingAuth ? (
        <Loading isLoading={true} />
      ) : (
        <ClientPatientComponent patient={patient} />
      )}
    </>
  );
};

export default PatientPage;
