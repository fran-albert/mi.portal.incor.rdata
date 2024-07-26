"use client"; 
import { Role } from "@/common/enums/role.enum";
import { useSession } from "next-auth/react";

const useRoles = () => {
  const { data: session } = useSession();

  const roles = session?.user?.role ?? [];

  const isPatient = roles.includes(Role.PACIENTE);
  const isSecretary = roles.includes(Role.SECRETARIA);
  const isDoctor = roles.includes(Role.MEDICO);
  const isAdmin = isPatient && isSecretary && isDoctor;

  return { isPatient, isSecretary, isDoctor, isAdmin };
};

export default useRoles;
