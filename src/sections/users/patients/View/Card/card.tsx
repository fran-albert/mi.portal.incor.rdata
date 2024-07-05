import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import Loading from "@/components/Loading/loading";
import { MdFamilyRestroom } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import {
  FaEquals,
  FaHeart,
  FaIdCard,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Patient } from "@/modules/patients/domain/Patient";
import { EditButton } from "@/components/Button/Edit/button";
import Image from "next/image";
import { calculateAge, formatDate, formatDni } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
const PatientCardComponent = ({
  patient,
  registerBy,
}: {
  patient: Patient | null;
  registerBy: undefined | string;
}) => {
  const { isPatient, isSecretary } = useRoles();
  const patientImageUrl = patient?.photo
    ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${patient.photo}`
    : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png";
  return (
    <>
      <Card>
        <CardHeader>
          <Avatar className="w-16 h-16 border">
            <AvatarImage alt="Dr. John Doe" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle>
              {patient?.firstName} {patient?.lastName}
            </CardTitle>
            <CardDescription>
              Creado por {registerBy || "Desconocido"}
            </CardDescription>
            {isSecretary && (
              <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                <EditButton
                  id={Number(patient?.userId)}
                  path="usuarios/pacientes"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <FaUser className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{calculateAge(String(patient?.birthDate))} años</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEquals className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{patient?.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>
                {patient?.address?.street && patient?.address?.number
                  ? `${patient.address.street}, ${patient.address.number} -`
                  : ""}
                {patient?.address?.city?.name},{" "}
                {patient?.address?.city?.state.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{patient?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <CiMail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{patient?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaIdCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{formatDni(String(patient?.dni))}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdDateRange className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{formatDate(String(patient?.birthDate))}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>
                {patient?.healthPlans?.map((healthPlan) => (
                  <div key={healthPlan.id}>
                    {healthPlan.healthInsurance.name} -{" "}
                    {patient.affiliationNumber}
                  </div>
                ))}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdBloodtype className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>
                {" "}
                {patient?.bloodType} - {patient?.rhFactor}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MdFamilyRestroom className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>
                {patient?.maritalStatus ?? "Estado Civil no asignado"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoIosInformationCircleOutline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{patient?.observations ?? "Sin observaciones"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PatientCardComponent;
