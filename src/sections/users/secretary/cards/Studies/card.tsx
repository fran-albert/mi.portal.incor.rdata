import Link from "next/link";
import { FaFilePdf } from "react-icons/fa";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
export const StudiesCount = ({
  totalStudies,
  lastStudies,
}: {
  totalStudies: number;
  lastStudies: number;
}) => {
  return (
    <>
      <div className="rounded-lg w-84 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
        <Link href={``}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Estudios</CardTitle>
              <FaFilePdf className="w-4 h-4" color="#dc2626" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudies}</div>
              <p className="text-xs text-muted-foreground">
                +{lastStudies} desde la semana pasada
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
