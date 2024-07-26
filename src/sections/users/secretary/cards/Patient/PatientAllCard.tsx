import Link from "next/link";
import { FaUser } from "react-icons/fa";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
export const PatientCount = ({
  lastedPatients,
  totalPatients,
}: {
  lastedPatients: number;
  totalPatients: number;
}) => {
  return (
    <>
      <div className="rounded-lg w-84 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
        <Link href={`/usuarios/pacientes`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
              <FaUser className="w-4 h-4" color="#0f766e" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                +{lastedPatients} desde la semana pasada
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
