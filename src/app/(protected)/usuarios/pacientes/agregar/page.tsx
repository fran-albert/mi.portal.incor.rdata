"use client";
import React from "react";
import { CreatePatientForm } from "@/sections/users/patients/create/CreatePatientForm";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import useAuth from "@/hooks/Auth/useAuth";

function AddPatientPage() {
  const isLoadingAuth = useAuth([Role.SECRETARIA]);

  if (isLoadingAuth) {
    return <Loading isLoading={true} />;
  }

  return <CreatePatientForm />;
}

export default AddPatientPage;
