"use client";
import React, { useEffect, useState } from "react";
import { Study } from "@/types/Study/Study";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import { useStudy } from "@/hooks/Study/useStudy";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";
import MyStudiesCardComponent from "@/sections/My-Studies";
import StudiesComponent from "@/components/Studies/Component";
import { useAllUltraSoundImages } from "@/hooks/Ultra-Sound-Images/useAllUtraSoundImages";

function ClientMyStudiesComponent({ session }: { session: Session }) {
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  const [labs, setLabs] = useState<Study[]>([]);
  const [ecography, setEcography] = useState<Study[]>([]);

  const { studiesByUserId = [], isLoadingStudiesByUserId } = useStudy({
    idUser: userId,
    fetchStudiesByUserId: true,
  });

  const { data: urls = {}, isLoading: isLoadingUrls } = useStudyUrls(
    userId,
    studiesByUserId || []
  );

  const { data: ultraSoundImages = {}, isLoading: isLoadingUltraSoundImages } =
    useAllUltraSoundImages(userId, studiesByUserId, isLoadingStudiesByUserId);

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

  return (
    <div className="container mt-2">
      {/* <MyStudiesCardComponent idUser={Number(userId)} /> */}
      {studiesByUserId && (
        <StudiesComponent
          studiesByUserId={studiesByUserId}
          urls={urls}
          ultraSoundImages={ultraSoundImages}
        />
      )}
    </div>
  );
}

export default ClientMyStudiesComponent;
