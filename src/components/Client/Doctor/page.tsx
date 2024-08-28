"use client";
import React from "react";
import { formatDateWithTime } from "@/common/helpers/helpers";
import DoctorCardComponent from "@/sections/users/doctors/View/Card/card";
import { Doctor } from "@/types/Doctor/Doctor";
import BreadcrumbComponent from "@/components/Breadcrumb";
import { Study } from "@/types/Study/Study";
import StudiesComponent from "@/components/Studies/Component";
export function DoctorComponent({
  doctor,
  urls,
  studiesByUserId,
}: {
  doctor: Doctor | undefined;
  urls: any;
  studiesByUserId: Study[];
}) {
  const registerByText =
    doctor?.registerBy?.firstName +
    " " +
    doctor?.registerBy?.lastName +
    " " +
    "- " +
    formatDateWithTime(String(doctor?.registrationDate));

  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Médicos", href: "/usuarios/medicos" },
    {
      label: doctor ? `${doctor.firstName} ${doctor.lastName}` : "Médico",
      href: `/usuarios/medicos/${doctor?.slug}`,
    },
  ];
  return (
    <div className="container space-y-2 mt-2">
      <BreadcrumbComponent items={breadcrumbItems} />
      <div className="md:grid md:grid-cols-[320px_1fr] gap-6">
        {doctor && (
          <DoctorCardComponent doctor={doctor} registerBy={registerByText} />
        )}
        <div className="md:grid md:gap-6 space-y-4">
          <StudiesComponent
            idUser={Number(doctor?.userId)}
            studiesByUserId={studiesByUserId}
            role="pacientes"
            urls={urls}
            slug={String(doctor?.slug)}
          />
          {/* <StudiesCardComponent idUser={Number(doctor?.userId)} /> */}
        </div>
      </div>
    </div>
  );
}
