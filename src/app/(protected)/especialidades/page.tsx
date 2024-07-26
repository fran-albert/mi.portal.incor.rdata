import ClientSpecialityComponent from "@/components/Client/Speciality";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Especialidades",
};

const SpecialityPage = () => {
  return <ClientSpecialityComponent />;
};

export default SpecialityPage;
