import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/User/User";
import { useSession } from "next-auth/react";
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
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Iniciar Nueva Consulta
          </button>
          <button className="flex items-center text-teal-500 hover:text-teal-700 font-semibold py-2 px-4">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 3a2 2 0 012-2h6a2 2 0 012 2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2 2H7a2 2 0 01-2-2H3a2 2 0 01-2-2V5a2 2 0 012-2h2zm4 0a2 2 0 00-2 2v2h2V3z"
                clip-rule="evenodd"
              />
            </svg> */}
            Agendar Consulta
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium text-gray-900">
              Historial de Visitas
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="w-2 bg-teal-500 rounded-l-xl"></div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-teal-800">
                20 FEB 2024
              </span>
              <span className="text-sm text-teal-800">02:38PM</span>
            </div>
            <div className="w-2 bg-teal-500 rounded-l-xl"></div>
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">
                Dr. Francisco Albert
              </span>
            </div>
            <div>
              <p className="text-gray-600">Dolor De Estómago</p>
              <p className="text-sm text-gray-500">
                Gastroenteritis y colitis de origen no especificado. Peptobismol
                Cpr C24.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl mt-6 shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="w-2 bg-teal-500 rounded-l-xl"></div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-teal-800">
                20 FEB 2024
              </span>
              <span className="text-sm text-teal-800">02:38PM</span>
            </div>
            <div className="w-2 bg-teal-500 rounded-l-xl"></div>
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">
                Dr. Francisco Albert
              </span>
            </div>
            <div>
              <p className="text-gray-600">Dolor De Estómago</p>
              <p className="text-sm text-gray-500">
                Gastroenteritis y colitis de origen no especificado. Peptobismol
                Cpr C24.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentCardComponent;
