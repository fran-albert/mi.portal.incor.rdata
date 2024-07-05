import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import { Study } from "@/modules/study/domain/Study";
import { formatDate } from "@/common/helpers/helpers";

interface EcographyProps {
  ecography: Study[];
  urls: { [key: number]: string };
}

export function Ecography({ ecography, urls }: EcographyProps) {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-none">
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold mb-4">Ecografías</h3>
          <div className="grid gap-4 overflow-x-auto md:overflow-x-visible">
            {ecography.length > 0 ? (
              ecography.map((lab, index) => (
                <Card
                  key={lab.id}
                  className="grid grid-cols-[40px_1fr_auto] items-center gap-4 p-4 rounded-lg shadow-sm dark:shadow-none"
                >
                  <div className="text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRegFilePdf className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-medium">{lab.note}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(String(lab.date))}
                      </p>
                    </div>
                  </div>
                  {urls[lab.id] ? (
                    <Link
                      className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      href={urls[lab.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Descargar
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      No URL
                    </span>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No hay ecografías.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
