"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { DoctorComponent } from "@/components/Client/Doctor/page";
import { useDoctor } from "@/hooks/Doctor/useDoctor";
import useAuth from "@/hooks/Auth/useAuth";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useStudy } from "@/hooks/Study/useStudy";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";
import { useAllUltraSoundImages } from "@/hooks/Ultra-Sound-Images/useAllUtraSoundImages";
import { useStudyAndImageUrls } from "@/hooks/Study/useStudyAndImageUrls";
import { useLoadingStore } from "@/stores/useLoading";

function DoctorPage() {
  const params = useParams();
  const slug = params.slug;
  const slugString = slug as string;
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);
  const slugParts = slugString.split("-");
  const id = parseInt(slugParts[slugParts.length - 1], 10);
  const { isLoading, doctor, error } = useDoctor({
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
      {error && (
        <div className="text-center font-bold">
          Hubo un error al cargos los datos del Doctor.
        </div>
      )}
      {!initialLoadComplete ? (
        <Loading isLoading={true} />
      ) : (
        <DoctorComponent
          doctor={doctor}
          urls={allUrls}
          studiesByUserId={studiesByUserId}
        />
      )}
    </>
  );
}

export default DoctorPage;
