"use client"; // Marca este archivo como un módulo del lado del cliente
import { Role } from "@/common/enums/role.enum";
import { useSession } from "next-auth/react";

const useRoles = () => {
  const { data: session } = useSession();

  const isPatient = session?.user.roles.includes(Role.PACIENTE);
  const isSecretary = session?.user.roles.includes(Role.SECRETARIA);
  const isDoctor = session?.user.roles.includes(Role.MEDICO);
  const isAdmin = isPatient && isSecretary && isDoctor;

  return { isPatient, isSecretary, isDoctor, isAdmin };
};

export default useRoles;
