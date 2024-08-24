"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import { DoctorComponent } from "@/components/Client/Doctor/page";
import { useDoctor } from "@/hooks/Doctor/useDoctor";
import useAuth from "@/hooks/Auth/useAuth";
import { useParams } from "next/navigation";
import React from "react";
import { useStudy } from "@/hooks/Study/useStudy";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";

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

  const { data: urls = {}, isLoading: isLoadingUrls } = useStudyUrls(
    id,
    studiesByUserId
  );

  return (
    <>
      {error && (
        <div className="text-center font-bold">
          Hubo un error al cargos los datos del Doctor.
        </div>
      )}
      {isLoading ||
      isLoadingUrls ||
      isLoadingStudiesByUserId ||
      isLoadingAuth ? (
        <Loading isLoading={true} />
      ) : (
        <DoctorComponent
          doctor={doctor}
          urls={urls}
          studiesByUserId={studiesByUserId}
        />
      )}
    </>
  );
}

export default DoctorPage;
