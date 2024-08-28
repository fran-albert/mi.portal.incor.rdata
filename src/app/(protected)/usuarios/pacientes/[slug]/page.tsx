"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { ClientPatientComponent } from "@/components/Client/Patient";
import { usePatient } from "@/hooks/Patient/usePatient";
import useAuth from "@/hooks/Auth/useAuth";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useStudy } from "@/hooks/Study/useStudy";
import { useStudyAndImageUrls } from "@/hooks/Study/useStudyAndImageUrls";
import { useLoadingStore } from "@/stores/useLoading";

const PatientPage = () => {
  const params = useParams();
  const slug = params.slug;
  const slugString = slug as string;
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);
  const slugParts = slugString.split("-");
  const id = parseInt(slugParts[slugParts.length - 1], 10);

  const { isLoading, patient, error } = usePatient({
    auth: !isLoadingAuth,
    id,
  });

  const { studiesByUserId = [], isLoadingStudiesByUserId } = useStudy({
    idUser: id,
    fetchStudiesByUserId: true,
  });

  const { data: allUrls = {}, isLoading: isLoadingUrls } = useStudyAndImageUrls(
    id,
    studiesByUserId
  );

  const initialLoadComplete = useLoadingStore(
    (state) => state.initialLoadComplete
  );
  const setInitialLoadComplete = useLoadingStore(
    (state) => state.setInitialLoadComplete
  );

  useEffect(() => {
    if (
      !isLoading &&
      !isLoadingStudiesByUserId &&
      !isLoadingUrls &&
      !isLoadingAuth
    ) {
      setInitialLoadComplete(true);
    }
  }, [
    isLoading,
    isLoadingStudiesByUserId,
    isLoadingUrls,
    isLoadingAuth,
    setInitialLoadComplete,
  ]);

  return (
    <>
      {error && <div>Hubo un error al cargar los pacientes.</div>}
      {!initialLoadComplete ? (
        <Loading isLoading={true} />
      ) : (
        <ClientPatientComponent
          patient={patient}
          urls={allUrls}
          studiesByUserId={studiesByUserId}
        />
      )}
    </>
  );
};

export default PatientPage;
