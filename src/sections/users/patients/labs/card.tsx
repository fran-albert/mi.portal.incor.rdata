import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import { Study } from "@/modules/study/domain/Study";
import { formatDate } from "@/common/helpers/helpers";

interface LabsCardProps {
  labs: Study[];
  urls: { [key: number]: string };
}

export function LabsCard({ labs, urls }: LabsCardProps) {
  return (
    <div className="md:p-4">
      <h3 className="text-lg font-bold mb-4">Laboratorios</h3>
      <div className="grid gap-4 overflow-x-auto md:overflow-x-visible">
        {labs.length > 0 ? (
          labs.map((lab, index) => (
            <Card
              key={lab.id}
              className="grid grid-cols-[40px_1fr_auto] items-center gap-4 p-4 rounded-lg shadow-sm dark:shadow-none"
            >
              <div className="text-gray-500 dark:text-gray-400">
                {index + 1}
              </div>
              <div className="flex items-center gap-3">
                <FaRegFilePdf className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-medium">{lab.note}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(String(lab.date))}
                  </p>
                </div>
              </div>
              {urls[lab.id] ? (
                <Link
                  className="text-sm text-red-500 hover:text-red-900 font-semibold"
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
            No hay laboratorios.
          </div>
        )}
      </div>
    </div>
  );
}
