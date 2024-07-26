"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { usePatient } from "@/hooks/Patient/usePatient";
import useAuth from "@/hooks/Auth/useAuth";
import EditPatientForm from "@/sections/users/patients/edit/EditPatientForm";
import { useParams } from "next/navigation";
import React from "react";

function EditPatientPage() {
  const params = useParams();
  const slug = params.slug;
  const slugString = slug as string;
  const slugParts = slugString.split("-");
  const id = parseInt(slugParts[slugParts.length - 1], 10);
  const isLoadingAuth = useAuth([Role.SECRETARIA]);
  const { isLoading, patient, error } = usePatient({
    auth: !isLoadingAuth,
    id,
  });

  return (
    <>
      {isLoading || (isLoadingAuth && <Loading isLoading={true} />)}
      {patient && <EditPatientForm patient={patient} />}
    </>
  );
}

export default EditPatientPage;
