"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MyStudiesComponent } from "@/sections/users/patients/MyStudies/component";
import { Study } from "@/modules/study/domain/Study";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import useStudyStore from "@/hooks/useStudy";

interface UrlMap {
  [key: number]: string;
}

function ClientMyStudiesComponent({ session }: { session: Session }) {
  const userId = session?.user?.id ? Number(session.user.id) : undefined;
  const [labs, setLabs] = useState<Study[]>([]);
  const [ecography, setEcography] = useState<Study[]>([]);
  const [urls, setUrls] = useState<UrlMap>({});
  const [areUrlsLoaded, setAreUrlsLoaded] = useState<boolean>(false);
  const {
    fetchStudiesByPatient,
    isLoading: isLoadingStudies,
    fetchStudyUrl,
  } = useStudyStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studiesResult = await fetchStudiesByPatient(Number(userId));

        const labs = studiesResult.filter((study) => study.studyType?.id === 1);
        const ecography = studiesResult.filter(
          (study) => study.studyType?.id === 2
        );

        setLabs(labs);
        setEcography(ecography);

        const newUrls: UrlMap = {};
        await Promise.all(
          studiesResult.map(async (study) => {
            const url = await fetchStudyUrl(Number(userId), study.locationS3);
            newUrls[study.id] = url;
          })
        );
        setUrls(newUrls);
        setAreUrlsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId, fetchStudiesByPatient, fetchStudyUrl]);

  if (isLoadingStudies || !areUrlsLoaded) {
    return <Loading isLoading={true} />;
  }

  return <MyStudiesComponent labs={labs} ecography={ecography} urls={urls} />;
}

export default ClientMyStudiesComponent;
