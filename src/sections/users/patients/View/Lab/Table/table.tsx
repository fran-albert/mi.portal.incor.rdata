import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useStudy } from "@/hooks/Study/useStudy";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LabData {
  testName: string;
  [date: string]: string | undefined;
}

const transformLabData = (labsDetails: any[]): LabData[] => {
  const groupedData: { [testName: string]: LabData } = {};

  labsDetails.forEach(({ date, ...tests }) => {
    Object.entries(tests).forEach(([testName, value]) => {
      if (!groupedData[testName]) {
        groupedData[testName] = { testName };
      }
      groupedData[testName][date] = value?.toString();
    });
  });

  return Object.values(groupedData);
};

export const LabPatientTable = ({ id }: { id: number }) => {
  const [transformedLabs, setTransformedLabs] = useState<LabData[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const { LabsDetails, isLoadingLabsDetails } = useStudy({
    fetchLabsDetails: true,
    idUser: id,
  });

  useEffect(() => {
    if (LabsDetails && LabsDetails.length > 0) {
      const transformed = transformLabData(LabsDetails);
      setTransformedLabs(transformed);

      const datesFromLabs = LabsDetails.map((lab) => lab.date);
      setDates(datesFromLabs);
    }
  }, [LabsDetails]);

  if (isLoadingLabsDetails) {
    return <Loading isLoading />;
  }

  if (!LabsDetails || LabsDetails.length === 0) {
    return (
      <div className="text-gray-900 text-sm">
        Los laboratorios del paciente no se pudieron insertar en la tabla.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative overflow-x-auto">
        <ScrollArea className="h-96">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10 border-b">
              <TableRow>
                <TableHead className="whitespace-nowrap w-32">
                  Análisis
                </TableHead>
                {dates.map((date) => (
                  <TableHead key={date} className="whitespace-nowrap">
                    {new Date(date).toLocaleDateString()}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transformedLabs.map(
                (lab) =>
                  lab.testName !== "id" && ( 
                    <TableRow key={lab.testName}>
                      <TableCell className="font-medium w-32">
                        {lab.testName}
                      </TableCell>
                      {dates.map((date) => (
                        <TableCell key={date}>
                          <Input type="text" defaultValue={lab[date]} />
                        </TableCell>
                      ))}
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};
