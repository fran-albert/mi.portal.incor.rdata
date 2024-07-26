"use client";
import Loading from "@/app/loading";
import { Role } from "@/common/enums/role.enum";
import useAuth from "@/hooks/Auth/useAuth";
import { useSpeciality } from "@/hooks/Speciality/useSpeciality";
import { SpecialityTable } from "@/sections/users/secretary/Especiality/table/table";

function ClientSpecialityComponent() {
  const isLoadingAuth = useAuth([Role.SECRETARIA, Role.MEDICO]);
  const { specialities, isLoading } = useSpeciality({});

  if (isLoading || isLoadingAuth) {
    return <Loading isLoading={true} />;
  }

  return <SpecialityTable specialities={specialities} />;
}

export default ClientSpecialityComponent;
