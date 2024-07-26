import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { LabsCard } from "../labs/card";
import { Study } from "@/types/Study/Study";
import { Ecography } from "../ecography/card";

interface MyStudiesComponentProps {
  labs: Study[];
  ecography: Study[];
  urls: any;
}

export function MyStudiesComponent({
  labs,
  ecography,
  urls,
}: MyStudiesComponentProps) {
  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-none">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Mis Estudios</h2>
            <div className="grid gap-4 overflow-x-auto md:overflow-x-visible">
              {/* <Card className="grid grid-cols-[40px_1fr_auto] items-center gap-4 p-4 rounded-lg shadow-sm dark:shadow-none">
                <div className="text-gray-500 dark:text-gray-400">1</div>
                <div className="flex items-center gap-3">
                  <FaRegFilePdf className="w-6 h-6 text-red-500" />
                  <div>
                    <h4 className="font-medium">Annual Report 2022.pdf</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Updated on May 15, 2023</p>
                  </div>
                </div>
                <Link
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  Download
                </Link>
              </Card> */}
              <Separator />
              <Ecography ecography={ecography} urls={urls} />
              <Separator />
              <LabsCard labs={labs} urls={urls} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
