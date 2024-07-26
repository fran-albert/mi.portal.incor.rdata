import ClientHealthInsuranceComponent from "@/components/Client/Health-Insurance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras Sociales",
};

const HealthInsurancesPage = () => {
  return <ClientHealthInsuranceComponent />;
};

export default HealthInsurancesPage;
