import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading/loading";
import { MdDateRange } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { formatDate, formatDni } from "@/common/helpers/helpers";
const DataProfileCard = ({ doctor }: { doctor: Doctor | null }) => {
  return (
    <>
      <div className="flex sm:mx-auto">
        <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 bg-gray-100 p-2">
              Datos Personales
            </h3>
            <ul>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <FaIdCard className="w-4 h-4 mr-2 text-red-600" />{" "}
                  <span className="text-sm font-medium">D.N.I.</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {formatDni(String(doctor?.dni))}
                </div>
              </li>

              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdDateRange className="w-4 h-4 mr-2 text-amber-600" />{" "}
                  <span className="text-sm font-medium">
                    Fecha de Nacimiento
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {formatDate(String(doctor?.birthDate))}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdPhone className="w-4 h-4 mr-2 text-green-600" />{" "}
                  <span className="text-sm font-medium">Teléfono</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.phoneNumber}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdEmail className="w-4 h-4 mr-2 text-sky-600" />{" "}
                  <span className="text-sm font-medium">
                    Correo Electrónico
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.email}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdLocationOn className="w-4 h-4 mr-2 text-gray-500" />{" "}
                  <span className="text-sm font-medium">Domicilio</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.address?.street}, {doctor?.address?.number} -{" "}
                  {doctor?.address?.city?.name},{" "}
                  {doctor?.address?.city?.state.name}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataProfileCard;
