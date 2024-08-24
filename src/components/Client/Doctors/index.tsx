"use client";
import { DoctorsTable } from "@/sections/users/doctors/table/table";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import useAuth from "@/hooks/Auth/useAuth";
import { useDoctors } from "@/hooks/Doctor/useDoctors";
import { usePrefetchDoctor } from "@/hooks/Doctor/usePrefetchDoctor";

const ClientDoctorComponent = () => {
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);
  const { isLoading, doctors, error } = useDoctors({
    auth: !isLoadingAuth,
    fetchDoctors: true,
  });
  const prefetchDoctors = usePrefetchDoctor();
  return (
    <>
      {isLoading || isLoadingAuth ? (
        <Loading isLoading={true} />
      ) : (
        <DoctorsTable
          doctors={doctors || []}
          prefetchDoctors={prefetchDoctors}
          isLoading={isLoading || isLoadingAuth}
        />
      )}
    </>
  );
};

export default ClientDoctorComponent;
