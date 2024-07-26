import ClientDoctorComponent from "@/components/Client/Doctors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medicos",
};

const DoctorsPage = () => {
  return <ClientDoctorComponent />;
};

export default DoctorsPage;
