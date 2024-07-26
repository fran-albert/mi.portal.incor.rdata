import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { DataTable } from "@/components/Table/table";
import useLabStore from "@/hooks/useLabs";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/common/helpers/helpers";

const transformLabData = (labData: any) => {
  let results = [];
  const { date, ...rest } = labData;
  for (const [key, value] of Object.entries(rest)) {
    if (key !== "id") {
      results.push({ testName: key, value: value?.toString(), date });
    }
  }
  return results;
};

const groupByDate = (data: any[]) => {
  const groupedData: { [date: string]: any[] } = {};
  data.forEach((item) => {
    if (!groupedData[item.date]) {
      groupedData[item.date] = [];
    }
    groupedData[item.date].push(item);
  });
  return groupedData;
};

export const LabPatientTable = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedLabs, setGroupedLabs] = useState<{ [date: string]: any[] }>({});
  const { fetchLabsDetails, labsDetails } = useLabStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchLabsDetails(id);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchLabsDetails, id]);

  useEffect(() => {
    if (labsDetails && labsDetails.length > 0) {
      const transformedLabs = labsDetails.flatMap(transformLabData);
      const grouped = groupByDate(transformedLabs);
      setGroupedLabs(grouped);
    }
  }, [labsDetails]);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!labsDetails || labsDetails.length === 0) {
    return (
      <div className="text-gray-900 text-sm">
        Los laboratorios del paciente no se pudieron insertar en la tabla.
      </div>
    );
  }

  return (
    <div className="w-full">
      {Object.keys(groupedLabs).map((date) => (
        <div key={date}>
          <DataTable
            columns={[
              { header: "", accessorKey: "testName" },
              { header: formatDate(date), accessorKey: "value" },
            ]}
            data={groupedLabs[date]}
            showSearch={false}
          />
        </div>
      ))}
    </div>
  );
};
