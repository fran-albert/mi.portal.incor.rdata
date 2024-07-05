import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import StudyDialog from "./Dialog/dialog";
import { formatDate } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import DeleteStudyDialog from "./Delete/dialog";
import useStudyStore from "@/hooks/useStudy";

interface UrlMap {
  [key: number]: string;
}

const StudiesCardComponent = ({ idUser }: { idUser: number }) => {
  const [urls, setUrls] = useState<UrlMap>({});
  const { isSecretary } = useRoles();
  const { studies, fetchStudiesByPatient, fetchStudyUrl } = useStudyStore();
  useEffect(() => {
    fetchStudiesByPatient(idUser);
  }, [idUser, fetchStudiesByPatient]);
  useEffect(() => {
    const fetchUrls = async () => {
      if (studies) {
        const newUrls: UrlMap = {};
        for (const study of studies) {
          const url = await fetchStudyUrl(idUser, study.locationS3);
          newUrls[study.id] = url;
        }
        setUrls(newUrls);
      }
    };
    fetchUrls();
  }, [studies, fetchStudyUrl, idUser]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Estudios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between h-full">
            <div>
              {studies?.length > 0 ? (
                <div className="rounded-lg overflow-hidden">
                  {studies.map((study) => (
                    <div
                      key={study.id}
                      className="grid grid-cols-[50px_1fr_auto] gap-4 items-center p-2 rounded"
                    >
                      <FaRegFilePdf
                        className="w-8 h-8 text-red-600 cursor-pointer"
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
                        <DeleteStudyDialog
                          studies={studies}
                          idStudy={study.id}
                        />
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
    </>
  );
};

export default StudiesCardComponent;
