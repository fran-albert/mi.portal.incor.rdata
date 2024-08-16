import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { DataTable } from "@/components/Table/table";
import { useStudy } from "@/hooks/Study/useStudy";
import { getColumns } from "./columns";

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
  const [transformedLabs, setTransformedLabs] = useState<any[]>([]);
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

  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    setTransformedLabs((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

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
      <DataTable
        columns={getColumns(dates, updateMyData)}
        data={transformedLabs}
        showSearch={false}
      />
    </div>
  );
};
