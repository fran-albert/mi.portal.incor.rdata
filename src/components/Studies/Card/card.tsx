import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import { formatDate } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { useStudy } from "@/hooks/Study/useStudy";
import Loading from "@/app/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewButton } from "@/components/Button/View/button";
import { BsFillFileTextFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Study } from "@/types/Study/Study";
import StudyDialog from "../Upload/dialog";
import DeleteStudyDialog from "../Delete/dialog";
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

  const groupStudiesByType = (studiesByUserId: Study[]) => {
    return studiesByUserId.reduce((acc, study) => {
      const name = study.studyType?.name;
      if (!name) return acc;
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(study);
      return acc;
    }, {} as Record<string, Study[]>);
  };

  const groupedStudies = groupStudiesByType(studiesByUserId);
  const hasStudies = Object.keys(groupedStudies).length > 0;
  if (isLoadingStudiesByUserId || isLoadingUrls) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-incor">
            <BsFillFileTextFill className="mr-2" />
            Estudios Médicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full rounded-md border p-4">
            {hasStudies ? (
              Object.entries(groupedStudies).map(
                ([studyType, studiesOfType]) => (
                  <div key={studyType} className="mb-6">
                    <h3 className="flex items-center text-lg font-semibold mb-2 text-incor">
                      {studyType}
                    </h3>
                    {studiesOfType.map((study) => (
                      <div
                        key={study.id}
                        className="grid grid-cols-[50px_1fr_auto] gap-4 items-center p-2 rounded hover:bg-gray-50 transition-colors duration-200"
                      >
                        <FaRegFilePdf
                          className="w-6 h-6 text-red-600 cursor-pointer"
                          onClick={() => window.open(urls[study.id], "_blank")}
                        />
                        <div className="grid gap-1">
                          <span className="text-sm font-medium">
                            {study?.note}
                          </span>
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
                )
              )
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No hay estudios cargados.
              </div>
            )}
          </ScrollArea>
          {isSecretary && (
            <div className="w-fullmx-auto mt-2">
              <StudyDialog idUser={idUser} />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default StudiesCardComponent;
