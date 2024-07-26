"use client";
import Loading from "@/app/loading";
import { PatientsTable } from "@/sections/users/patients/table/table";
import { Role } from "@/common/enums/role.enum";
import { usePrefetchPatient } from "@/hooks/Patient/usePrefetchPatient";
import { usePatients } from "@/hooks/Patient/usePatients";
import useAuth from "@/hooks/Auth/useAuth";

const ClientPatientComponent = () => {
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);
  const { isLoading, patients, error } = usePatients({ auth: !isLoadingAuth });
  const prefetchPatients = usePrefetchPatient();

  if (isLoadingAuth) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading isLoading={true} />
      ) : (
        <PatientsTable
          patients={patients || []}
          prefetchPatients={prefetchPatients}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ClientPatientComponent;
