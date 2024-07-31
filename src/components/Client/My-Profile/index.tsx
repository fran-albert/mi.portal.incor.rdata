"use client";
import Loading from "@/app/loading";
import { useDoctor } from "@/hooks/Doctor/useDoctor";
import { usePatient } from "@/hooks/Patient/usePatient";
import useProfileStore from "@/hooks/useProfile";
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
  const { profileData } = useProfileStore();

  const { patient, isLoading: isLoadingPatient } = usePatient({
    auth: isPatient && id !== undefined,
    id: id !== undefined ? id : -1,
  });

  const { doctor, isLoading: isLoadingDoctor } = useDoctor({
    auth: isDoctor && id !== undefined,
    id: id !== undefined ? id : -1,
  });

  if ((isDoctor && isLoadingDoctor) || (isPatient && isLoadingPatient)) {
    return <Loading isLoading={true} />;
  }

  if (isDoctor && doctor) {
    return <ProfileDoctorCardComponent data={doctor} />;
  }

  if (isSecretary) {
    return <ProfileSecretaryCardComponent user={profileData} />;
  }

  if (isPatient && patient) {
    return <ProfileCardComponent data={patient} />;
  }

  return null;
};

export default ClientMyProfileComponent;
