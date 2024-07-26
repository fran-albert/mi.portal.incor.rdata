"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { useDoctor } from "@/hooks/Doctor/useDoctor";
import useAuth from "@/hooks/Auth/useAuth";
import EditDoctorForm from "@/sections/users/doctors/edit/EditDoctorForm";
import { useParams } from "next/navigation";
import React from "react";

function EditDoctorPage() {
  const params = useParams();
  const slug = params.slug;
  const slugString = slug as string;
  const slugParts = slugString.split("-");
  const id = parseInt(slugParts[slugParts.length - 1], 10);
  const isLoadingAuth = useAuth([Role.SECRETARIA]);
  const { isLoading, doctor, error } = useDoctor({ auth: !isLoadingAuth, id });

  return (
    <>
      {isLoading || (isLoadingAuth && <Loading isLoading={true} />)}
      {doctor && <EditDoctorForm doctor={doctor} />}
    </>
  );
}

export default EditDoctorPage;
