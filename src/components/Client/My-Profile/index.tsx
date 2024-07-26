"use client";
import Loading from "@/app/loading";
import useProfileStore from "@/hooks/useProfile";
import useRoles from "@/hooks/useRoles";
import ProfileDoctorCardComponent from "@/sections/Profile/doctor/card";
import ProfileCardComponent from "@/sections/Profile/patient/ProfileCard";
import ProfileSecretaryCardComponent from "@/sections/Profile/secretary/card";
import axiosInstance from "@/services/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const fetchProfileData = async (role: string, id: number) => {
  const endpoint =
    role === "Doctor"
      ? "doctor"
      : role === "Secretary"
      ? "Account"
      : "Patient";
  const response = await axiosInstance.get(`${endpoint}/${id}`);
  return response.data;
};

const ClientMyProfileComponent = () => {
  const { data: session } = useSession();
  const id = Number(session?.user?.id);
  const { isPatient, isDoctor, isSecretary } = useRoles();
  const { profileData, setProfileData } = useProfileStore();

  const role = isDoctor
    ? "Doctor"
    : isSecretary
    ? "Secretary"
    : isPatient
    ? "Patient"
    : null;

  const { isLoading, error, data } = useQuery({
    queryKey: ["profileData", role, id],
    queryFn: () => fetchProfileData(role!, id),
    enabled: !!role && !!id,
  });

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data, setProfileData]);

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  if (error) {
    return <div>An error has occurred: {(error as Error).message}</div>;
  }

  if (isDoctor) {
    return <ProfileDoctorCardComponent data={profileData} />;
  }

  if (isSecretary) {
    return <ProfileSecretaryCardComponent user={profileData} />;
  }

  if (isPatient) {
    return <ProfileCardComponent data={profileData} />;
  }

  return null;
};

export default ClientMyProfileComponent;
