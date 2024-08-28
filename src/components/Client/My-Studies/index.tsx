"use client";
import React, { useEffect, useState } from "react";
import { Study } from "@/types/Study/Study";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import { useStudy } from "@/hooks/Study/useStudy";
import MyStudiesCardComponent from "@/sections/My-Studies";
import StudiesComponent from "@/components/Studies/Component";
import { useAllUltraSoundImages } from "@/hooks/Ultra-Sound-Images/useAllUtraSoundImages";
import { useStudyAndImageUrls } from "@/hooks/Study/useStudyAndImageUrls";

function ClientMyStudiesComponent({ session }: { session: Session }) {
  const userId = session?.user?.id ? Number(session.user.id) : undefined;

  const { studiesByUserId = [], isLoadingStudiesByUserId } = useStudy({
    idUser: userId,
    fetchStudiesByUserId: true,
  });

  const { data: allUrls = {}, isLoading: isLoadingUrls } = useStudyAndImageUrls(
    userId,
    studiesByUserId
  );

  if (isLoadingStudiesByUserId || isLoadingUrls) {
    return <Loading isLoading={true} />;
  }

  return (
    <MyStudiesCardComponent studiesByUserId={studiesByUserId} urls={allUrls} />
  );
}

export default ClientMyStudiesComponent;
