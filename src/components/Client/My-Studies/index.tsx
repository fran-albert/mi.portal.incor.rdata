"use client";
import React, { useEffect, useState } from "react";
import { MyStudiesComponent } from "@/sections/users/patients/MyStudies/component";
import { Study } from "@/types/Study/Study";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import { useStudy } from "@/hooks/Study/useStudy";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";

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

  return <MyStudiesComponent labs={labs} ecography={ecography} urls={urls} />;
}

export default ClientMyStudiesComponent;
