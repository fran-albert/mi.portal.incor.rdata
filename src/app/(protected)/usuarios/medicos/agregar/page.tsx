"use client";
import React from "react";
import Loading from "@/app/loading";
import useAuth from "@/hooks/Auth/useAuth";
import { Role } from "@/common/enums/role.enum";
import CreateDoctorForm from "@/sections/users/doctors/create/CreateDoctorForm";

function AddDoctorPage() {
  const isLoadingAuth = useAuth([Role.SECRETARIA]);

  if (isLoadingAuth) {
    return <Loading isLoading={true} />;
  }

  return <CreateDoctorForm />;
}

export default AddDoctorPage;
