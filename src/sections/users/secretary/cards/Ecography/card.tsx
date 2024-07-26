import Link from "next/link";
import { PiUserSoundThin } from "react-icons/pi";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
export const EcographyCount = ({
  totalEcography,
  lastEcography,
}: {
  totalEcography: number;
  lastEcography: number;
}) => {
  return (
    <>
      <div className="rounded-lg w-84 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer">
        <Link href={``}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ecografías</CardTitle>
              <PiUserSoundThin className="w-4 h-4" color="#2563eb" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEcography}</div>
              <p className="text-xs text-muted-foreground">
                +{lastEcography} desde la semana pasada
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
