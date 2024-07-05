import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/loading";
import { createApiLabRepository } from "@/modules/labs/infra/ApiLabRepository";
import { getLabsDetail } from "@/modules/labs/application/get-labs-detail/getLabsDetail";
import { Labs } from "@/modules/labs/domain/Labs";

const transformLabData = (labData: any) => {
  let results = [];
  for (const [key, value] of Object.entries(labData)) {
    if (key !== "id" && typeof value !== "object") {
      results.push({ testName: key, value: value?.toString() });
    }
  }
  return results;
};

const labRepository = createApiLabRepository();
export const LabPatientTable = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [labs, setLabs] = useState<any[]>([]);
  const loadAllLabsDetail = getLabsDetail(labRepository);

  const fetchLabsDetail = async () => {
    try {
      setIsLoading(true);
      const labPatientData = await loadAllLabsDetail(id);
      const transformedData = transformLabData(labPatientData[3]);
      console.log(transformedData);
      setLabs(transformedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const labsColumns = getColumns();

  useEffect(() => {
    fetchLabsDetail();
  }, []);

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <div className="w-full">
        <DataTable columns={labsColumns} data={labs} showSearch={false} />
      </div>
    </>
  );
};
