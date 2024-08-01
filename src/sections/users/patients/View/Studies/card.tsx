import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import StudyDialog from "./Dialog/dialog";
import { formatDate } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import DeleteStudyDialog from "./Delete/dialog";
import { useStudyUrls } from "@/hooks/Study/useStudyUrl";
import { useStudy } from "@/hooks/Study/useStudy";
import Loading from "@/app/loading";
import { ViewButton } from "@/components/Button/View/button";

const StudiesCardComponent = ({ idUser }: { idUser: number }) => {
  const { isSecretary, isDoctor } = useRoles();
  const { studiesByUserId = [], isLoadingStudiesByUserId } = useStudy({
    idUser: idUser,
    fetchStudiesByUserId: true,
  });

  const { data: urls = {}, isLoading: isLoadingUrls } = useStudyUrls(
    idUser,
    studiesByUserId
  );

  if (isLoadingStudiesByUserId || isLoadingUrls) {
    return <Loading isLoading={true} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between">
          <div>
            {studiesByUserId.length > 0 ? (
              <div className="rounded-lg overflow-hidden">
                {studiesByUserId.map((study) => (
                  <div
                    key={study.id}
                    className="grid grid-cols-[50px_1fr_auto] gap-4 items-center p-2 rounded"
                  >
                    <FaRegFilePdf
                      className="w-8 h-8 text-red-600 cursor-pointer"
                      onClick={() => window.open(urls[study.id], "_blank")}
                    />
                    <div className="grid gap-1">
                      <span className="text-sm font-medium">{study?.note}</span>
                      <div className="text-xs text-gray-500">
                        {formatDate(String(study.date))}
                      </div>
                    </div>
                    {isSecretary && (
                      <div className="flex gap-2">
                        <ViewButton url={urls[study.id]} text="Ver" />
                        <DeleteStudyDialog
                          studies={studiesByUserId}
                          idStudy={study.id}
                        />
                      </div>
                    )}
                    {isDoctor && !isSecretary && (
                      <ViewButton url={urls[study.id]} text="Ver" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-700 p-2">
                No hay estudios cargados.
              </div>
            )}
          </div>
          {isSecretary && (
            <div className="mt-auto">
              <StudyDialog idUser={idUser} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudiesCardComponent;
