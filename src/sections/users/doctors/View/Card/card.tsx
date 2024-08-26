import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiMail } from "react-icons/ci";
import {
  FaEquals,
  FaHeart,
  FaIdCard,
  FaMars,
  FaPhoneAlt,
  FaUser,
  FaVenus,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Doctor } from "@/types/Doctor/Doctor";
import { calculateAge, formatDate, formatDni } from "@/common/helpers/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDateRange } from "react-icons/md";
import { EditButtonIcon } from "@/components/Button/Edit/button";
import useRoles from "@/hooks/useRoles";
import ResetDefaultPasswordDialog from "@/components/Button/Reset-Default-Password";
const DoctorCardComponent = ({
  doctor,
  registerBy,
}: {
  doctor: Doctor | null;
  registerBy: undefined | string;
}) => {
  const { isSecretary } = useRoles();
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-incor">
            {doctor?.gender === "Masculino" ? "Dr. " : "Dra. "}{" "}
            {doctor?.firstName} {doctor?.lastName}
          </CardTitle>
          <CardDescription>
            Creado por {registerBy || "Desconocido"}
          </CardDescription>
          {isSecretary && (
            <div className="flex justify-center gap-4">
              <div className="text-gray-600 hover:text-gray-800">
                <EditButtonIcon
                  slug={doctor?.slug}
                  id={doctor?.id}
                  props={{ variant: "outline" }}
                  path="usuarios/medicos"
                />
              </div>
              <div className="text-gray-600 hover:text-gray-800">
                <ResetDefaultPasswordDialog idUser={Number(doctor?.userId)} />
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <FaUser className="h-5 w-5 text-teal-500" />
            <span>{calculateAge(String(doctor?.birthDate))} años</span>
          </div>
          <div className="flex items-center gap-2">
            {doctor?.gender === "Masculino" ? (
              <>
                <FaMars className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <span>{doctor?.gender}</span>
              </>
            ) : (
              <>
                <FaVenus className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                <span>{doctor?.gender}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot className="h-5 w-5 text-red-500" />
            <span>
              {doctor?.address?.street && doctor?.address?.number
                ? `${doctor.address.street}, ${doctor.address.number} -`
                : ""}
              {doctor?.address?.city?.name}, {doctor?.address?.city?.state.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="h-5 w-5 text-orange-500" />
            <span>{doctor?.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <CiMail className="h-5 w-5 text-gray-500" />
            <span>{doctor?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaIdCard className="h-5 w-5 text-cyan-500" />
            <span>{formatDni(String(doctor?.dni))}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdDateRange className="h-5 w-5 text-blue-500" />
            <span>{formatDate(String(doctor?.birthDate))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCardComponent;
