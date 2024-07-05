import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/modules/users/domain/User";
import { useSession } from "next-auth/react";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import Loading from "@/components/Loading/loading";
import { useParams } from "next/navigation";
import { CiMail } from "react-icons/ci";
import {
  FaEquals,
  FaHeart,
  FaIdCard,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditButton } from "@/components/Button/Edit/button";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { calculateAge, formatDate, formatDni } from "@/common/helpers/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDateRange } from "react-icons/md";
const DoctorCardComponent = ({
  doctor,
  registerBy,
}: {
  doctor: Doctor | null;
  registerBy: undefined | string;
}) => {
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
              {doctor?.gender === "Masculino" ? "Dr. " : "Dra. "}{" "}
              {doctor?.firstName} {doctor?.lastName}
            </CardTitle>
            <CardDescription>
              Creado por {registerBy || "Desconocido"}
            </CardDescription>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <EditButton id={Number(doctor?.userId)} path="usuarios/medicos" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <FaUser className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{calculateAge(String(doctor?.birthDate))} años</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEquals className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{doctor?.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>
                {doctor?.address?.street && doctor?.address?.number
                  ? `${doctor.address.street}, ${doctor.address.number} -`
                  : ""}
                {doctor?.address?.city?.name},{" "}
                {doctor?.address?.city?.state.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{doctor?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <CiMail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{doctor?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaIdCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{formatDni(String(doctor?.dni))}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdDateRange className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{formatDate(String(doctor?.birthDate))}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="w-full max-w-lg shadow-md rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row p-4 items-start sm:items-center">
          <div className="flex-shrink-0 pb-4 sm:pb-0">
            <img
              className="w-24 h-24 rounded-full"
              src="https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              alt="Imagen del Usuario"
            />
          </div>
          <div className="flex-grow sm:pl-4">
            <CardTitle className="text-teal-700 text-lg font-bold">
              {doctor?.firstName} {doctor?.lastName}
            </CardTitle>
            <p className="text-gray-600">
              {calculateAge(String(doctor?.birthDate))} años
            </p>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <EditButton id={Number(doctor?.userId)} path="usuarios/medicos" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="p-4 border border-green-700  rounded-lg">
            <h3 className="text-lg font-semibold">ESPECIALIDADES</h3>
            <p className="text-sm font-medium">
              {doctor?.specialities
                .map((speciality) => speciality.name)
                .join(", ")}
            </p>
            <h3 className="text-lg mt-2 font-semibold">OBRA SOCIAL</h3>
            <p className="text-sm font-medium">
              {doctor?.healthInsurances
                .map(
                  (item) =>
                    item.name.charAt(0).toUpperCase() +
                    item.name.slice(1).toLowerCase()
                )
                .join(", ")}
            </p>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
};

export default DoctorCardComponent;
