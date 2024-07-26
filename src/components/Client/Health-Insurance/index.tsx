"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import useAuth from "@/hooks/Auth/useAuth";
import { HealthInsuranceTable } from "@/sections/users/secretary/HealthCare/table/table";

const ClientHealthInsuranceComponent = () => {
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);

  if (isLoadingAuth) {
    return <Loading isLoading={true} />;
  }

  return <HealthInsuranceTable />;
};

export default ClientHealthInsuranceComponent;
