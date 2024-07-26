import Link from "next/link";
import { TbVaccine } from "react-icons/tb";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
export const LabsCount = ({ totalLabs }: { totalLabs: number }) => {
  return (
    <>
      <div className="rounded-lg w-84 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
        <Link href={``}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Laboratorios
              </CardTitle>
              <TbVaccine className="w-4 h-4" color="#166534" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLabs}</div>
              <p className="text-xs text-muted-foreground">
                +{1} desde la semana pasada
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
