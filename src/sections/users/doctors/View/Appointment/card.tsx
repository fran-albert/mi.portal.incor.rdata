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
import { FaEdit, FaPlus, FaUpload, FaUser } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AppointmentCardComponent = () => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Horarios
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium text-gray-900">Horaríos</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="w-2 bg-teal-500 rounded-l-xl"></div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">LUNES</span>
            </div>
            <div>
              <p className="text-gray-600">De 8 a 12 </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 mt-6 rounded-xl shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="w-2 bg-amber-500 rounded-l-xl"></div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">MARTES</span>
            </div>
            <div>
              <p className="text-gray-600">De 8 a 12 </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 mt-6 rounded-xl shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="w-2 bg-cyan-500 rounded-l-xl"></div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">JUEVES</span>
            </div>
            <div>
              <p className="text-gray-600">De 8 a 12 </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 mt-6 rounded-xl shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="w-2 bg-slate-500 rounded-l-xl"></div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">VIERNES</span>
            </div>
            <div>
              <p className="text-gray-600">De 8 a 12 </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentCardComponent;
