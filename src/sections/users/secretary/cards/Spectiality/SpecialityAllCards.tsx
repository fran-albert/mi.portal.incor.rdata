import Link from "next/link";
import { GiHospitalCross } from "react-icons/gi";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

export const SpectialityCount = ({
  totalSpecialities,
}: {
  totalSpecialities: number;
}) => {
  return (
    <Card className="rounded-lg sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
      <Link href={"/especialidades"}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Especialidades</CardTitle>
          <GiHospitalCross className="w-4 h-4" color="#b45309" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSpecialities}</div>
        </CardContent>
      </Link>
    </Card>
  );
};
