"use client";
import React, { useEffect } from "react";
import { formatDateWithTime } from "@/common/helpers/helpers";
import DoctorCardComponent from "@/sections/users/doctors/View/Card/card";
import DoctorSpecialitiesComponent from "@/sections/users/doctors/View/Specialities/card";
import Loading from "@/app/loading";
import { Doctor } from "@/types/Doctor/Doctor";
import BreadcrumbComponent from "@/components/Breadcrumb";
import StudiesCardComponent from "@/components/Studies/Card/card";
import StudiesTableComponent from "@/components/Studies/Table";
import { Study } from "@/types/Study/Study";
export function DoctorComponent({
  doctor,
  urls,
  studiesByUserId,
}: {
  doctor: Doctor | undefined;
  urls: Record<string, string>;
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
      <div className="md:grid md:grid-cols-[300px_1fr] gap-6">
        {doctor && (
          <DoctorCardComponent doctor={doctor} registerBy={registerByText} />
        )}
        <div className="md:grid md:gap-6 space-y-4">
          {doctor && <DoctorSpecialitiesComponent doctor={doctor} />}
          <StudiesTableComponent
            idUser={Number(doctor?.userId)}
            role="medicos"
            studiesByUserId={studiesByUserId}
            urls={urls}
            slug={String(doctor?.slug)}
          />
          <StudiesCardComponent idUser={Number(doctor?.userId)} />
        </div>
      </div>
    </div>
  );
}
