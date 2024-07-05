"use client";
import { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { MdHealthAndSafety } from "react-icons/md";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
const healthInsuranceRepository = createApiHealthInsuranceRepository();

export const HealthInsuranceCount = () => {
  const [totalHealthInsurance, setTotalHealthInsurance] = useState<number>(0);

  useEffect(() => {
    const fetchTotalHc = async () => {
      const total = await healthInsuranceRepository.getTotalHealthInsurances();
      setTotalHealthInsurance(total);
    };

    fetchTotalHc().catch(console.error);
  }, []);

  return (
    <>
      <Card
        className="rounded-lg sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 cursor-pointer"
        onClick={() => {
          window.location.href = "/obras-soaciles";
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Obras Sociales</CardTitle>
          <MdHealthAndSafety className="w-4 h-4" color="#b45309" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHealthInsurance}</div>
        </CardContent>
      </Card>
    </>
  );
};
