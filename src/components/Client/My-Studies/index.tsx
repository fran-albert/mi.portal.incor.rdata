"use client";
import React, { useEffect, useState } from "react";
import { Study } from "@/types/Study/Study";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import { useStudy } from "@/hooks/Study/useStudy";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";
import MyStudiesCardComponent from "@/sections/My-Studies";

function ClientMyStudiesComponent({ session }: { session: Session }) {
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  const [labs, setLabs] = useState<Study[]>([]);
  const [ecography, setEcography] = useState<Study[]>([]);
  const { studiesByUserId, isLoadingStudiesByUserId } = useStudy({
    idUser: userId,
    fetchStudiesByUserId: true,
  });

  const { data: urls = {}, isLoading: isLoadingUrls } = useStudyUrls(
    userId,
    studiesByUserId || []
  );

  useEffect(() => {
    if (studiesByUserId) {
      const labs = studiesByUserId.filter((study) => study.studyType?.id === 1);
      const ecography = studiesByUserId.filter(
        (study) => study.studyType?.id === 2
      );

      setLabs(labs);
      setEcography(ecography);
    }
  }, [studiesByUserId]);

  if (isLoadingStudiesByUserId || isLoadingUrls) {
    return <Loading isLoading={true} />;
  }

  return <MyStudiesCardComponent idUser={Number(userId)} />;
}

export default ClientMyStudiesComponent;
