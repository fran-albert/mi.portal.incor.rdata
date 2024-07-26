import ClientPatientComponent from "@/components/Client/Patients";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pacientes",
};
const PatientsPage = () => {
  return <ClientPatientComponent />;
};

export default PatientsPage;
