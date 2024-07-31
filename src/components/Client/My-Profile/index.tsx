"use client";
import Loading from "@/app/loading";
import { useDoctor } from "@/hooks/Doctor/useDoctor";
import { usePatient } from "@/hooks/Patient/usePatient";
import { useUser } from "@/hooks/User/useUser";
import useRoles from "@/hooks/useRoles";
import ProfileDoctorCardComponent from "@/sections/Profile/doctor/card";
import ProfileCardComponent from "@/sections/Profile/patient/ProfileCard";
import ProfileSecretaryCardComponent from "@/sections/Profile/secretary/card";
import { useSession } from "next-auth/react";
import React from "react";

const ClientMyProfileComponent = () => {
  const { data: session } = useSession();
  const id = session?.user?.id ? Number(session.user.id) : undefined;
  const { isPatient, isDoctor, isSecretary } = useRoles();

  const { user: secretary, isLoading: isLoadingSecretary } = useUser({
    auth: isSecretary && id !== undefined,
    id: id !== undefined ? id : -1,
  });

  const { patient, isLoading: isLoadingPatient } = usePatient({
    auth: isPatient && id !== undefined,
    id: id !== undefined ? id : -1,
  });

  const { doctor, isLoading: isLoadingDoctor } = useDoctor({
    auth: isDoctor && id !== undefined,
    id: id !== undefined ? id : -1,
  });

  if (
    (isDoctor && isLoadingDoctor) ||
    (isPatient && isLoadingPatient) ||
    (isSecretary && isLoadingSecretary)
  ) {
    return <Loading isLoading={true} />;
  }

  if (isDoctor && doctor) {
    return <ProfileDoctorCardComponent data={doctor} />;
  }

  if (isSecretary && secretary) {
    return <ProfileSecretaryCardComponent user={secretary} />;
  }

  if (isPatient && patient) {
    return <ProfileCardComponent data={patient} />;
  }

  return null;
};

export default ClientMyProfileComponent;
