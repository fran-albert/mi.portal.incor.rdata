import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { MdHealthAndSafety } from "react-icons/md";
import Link from "next/link";

export const HealthInsuranceCount = ({
  totalHealthInsurance,
}: {
  totalHealthInsurance: number;
}) => {
  return (
    <>
      <Card className="rounded-lg sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
        <Link href={"/obras-sociales"}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Obras Sociales
            </CardTitle>
            <MdHealthAndSafety className="w-4 h-4" color="#b45309" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHealthInsurance}</div>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};
