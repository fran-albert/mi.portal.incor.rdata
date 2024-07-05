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
import { FaUpload, FaWeight } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineFileJpg } from "react-icons/ai";
import { IoIosBody } from "react-icons/io";
import { MdHeight } from "react-icons/md";
const VitalSignCard = () => {
  return (
    <>
      <div className="flex sm:mx-auto">
        <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 bg-gray-100 p-2">
              Signos Vitales
            </h3>
            <ul>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <MdHeight className="w-4 h-4 mr-2 text-red-600" />
                  <span className="text-sm font-medium">Estatura</span>
                </div>
                <div className="text-xs text-gray-500">1,80 m</div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <FaWeight className="w-4 h-4 mr-2 text-amber-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">Peso</span>
                </div>
                <div className="text-xs text-gray-500">80 kg</div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <IoIosBody className="w-4 h-4 mr-2 text-green-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">Masa Corporal</span>
                </div>
                <div className="text-xs text-gray-500">24,69 kg/m2</div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <GiWeightLiftingUp className="w-4 h-4 mr-2 text-sky-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">Masa Muscular</span>
                </div>
                <div className="text-xs text-gray-500">20%</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VitalSignCard;
