"use client";
import useRoles from "@/hooks/useRoles";
import { CountsCards } from "@/components/Cards/Counts/card";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { usePatients } from "@/hooks/Patient/usePatients";
import { useDoctors } from "@/hooks/Doctor/useDoctors";
import { useSpeciality } from "@/hooks/Speciality/useSpeciality";
import { useHealthInsurance } from "@/hooks/Health-Insurance/useHealthInsurance";
import { useStudy } from "@/hooks/Study/useStudy";
import PatientHomePage from "@/sections/Home/Patient";
import useSessionStore from "@/stores/Session/session.store";

const ClientHomePage = () => {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const {
    isLoadingLastPatients,
    isLoadingTotalPatients,
    lastedpatients,
    totalPatients,
  } = usePatients({ auth: true });

  const {
    isLoadingLastDoctors,
    isLoadingTotalDoctors,
    totalDoctors,
    lastedDoctors,
  } = useDoctors({ auth: true });

  const { isLoadingTotalSpecialities, totalSpecialities } = useSpeciality({
    auth: true,
  });

  const { isLoadingTotalHealthInsurances, totalHealthInsurances } =
    useHealthInsurance({ auth: true });
  const {
    isLoadingTotalStudies,
    totalStudies,
    isLoadingTotalLabs,
    totalLabs,
    lastEcography,
    lastStudies,
    lastLabs,
    isLoadingTotalEcography,
    totalEcography,
  } = useStudy({ auth: true, fetchTotal: true });

  // const isLoading =
  //   status === "loading" ||
  //   isLoadingTotalPatients ||
  //   isLoadingLastPatients ||
  //   isLoadingTotalSpecialities ||
  //   isLoadingTotalHealthInsurances ||
  //   isLoadingTotalStudies ||
  //   isLoadingTotalLabs ||
  //   isLoadingTotalEcography ||
  //   isLoadingLastDoctors ||
  //   isLoadingTotalDoctors;

  // if (isLoading) {
  //   return <Loading isLoading={true} />;
  // }

  return (
    <div className="container">
      <>
        {isSecretary && (
          <div className="mt-10 px-8">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Panel de Control - Secretaria
            </h2>
            {/* <InfoBanner /> */}
            <CountsCards
              lastedPatients={Number(lastedpatients)}
              totalPatients={Number(totalPatients)}
              totalHealthInsurances={Number(totalHealthInsurances)}
              lastedDoctors={Number(lastedDoctors)}
              totalEcography={Number(totalEcography)}
              lastEcography={Number(lastEcography)}
              lastStudies={Number(lastStudies)}
              lastLabs={Number(lastLabs)}
              totalLabs={Number(totalLabs)}
              totalSpecialities={Number(totalSpecialities)}
              totalStudies={Number(totalStudies)}
              totalDoctors={Number(totalDoctors)}
            />
          </div>
        )}

        {isDoctor && (
          <div className="mt-10 px-8">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Panel de Control - Médico
            </h2>
            <CountsCards
              lastedPatients={Number(lastedpatients)}
              totalPatients={Number(totalPatients)}
              totalHealthInsurances={Number(totalHealthInsurances)}
              lastEcography={Number(lastEcography)}
              lastStudies={Number(lastStudies)}
              lastedDoctors={Number(lastedDoctors)}
              lastLabs={Number(lastLabs)}
              totalEcography={Number(totalEcography)}
              totalLabs={Number(totalLabs)}
              totalSpecialities={Number(totalSpecialities)}
              totalStudies={Number(totalStudies)}
              totalDoctors={Number(totalDoctors)}
            />
          </div>
        )}

        {isPatient && <PatientHomePage />}
      </>
    </div>
  );
};

export default ClientHomePage;
