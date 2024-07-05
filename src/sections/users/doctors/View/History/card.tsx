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
import { FaEdit, FaPlus, FaUpload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const HistoryCardComponent = () => {
  const antecedentes = [
    {
      nombre: "Antecedente 1",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 2",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 3",
      fecha: "01/01/2021",
    },
  ];

  return (
    <>
      <div className="flex sm:mx-auto">
        <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 bg-gray-100 p-2">
              Antecedentes
            </h3>
            <div className="space-y-4">
              {/* Lista de antecedentes */}
              {antecedentes.map((antecedente, index) => (
                <div
                  key={index}
                  className="p-2 rounded hover:bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {antecedente.nombre}
                    </p>
                    <p className="text-gray-600 text-xs">{antecedente.fecha}</p>
                  </div>
                  <button className="ml-4 text-gray-500 hover:text-gray-700">
                    <FaEdit className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <FaPlus className="w-4 h-4 mr-2 text-teal-600" />
                <span className="text-teal-600">Nuevo Antecedente</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCardComponent;
