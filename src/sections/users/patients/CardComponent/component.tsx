import { formatDateWithTime } from "@/common/helpers/helpers";
import Loading from "@/components/Loading/loading";
import "./style.css";
import StudiesCardComponent from "@/sections/users/patients/View/Studies/card";
import PatientCardComponent from "@/sections/users/patients/View/Card/card";
import { usePatient } from "@/hooks/usePatients";
import { useEffect } from "react";
import useStudyStore from "@/hooks/useStudy";
import HistoryCardComponent from "../View/History/card";
import { LabsCard } from "../labs/card";
import LabCard from "../View/Lab/card";

export function PatientComponent({ id }: { id: number }) {
  const { selectedPatient, getPatientById, isLoading, registerBy } =
    usePatient();

  useEffect(() => {
    getPatientById(id);
  }, [id, getPatientById]);

  const registerByText =
    registerBy?.firstName +
    " " +
    registerBy?.lastName +
    " " +
    "- " +
    formatDateWithTime(String(selectedPatient?.registrationDate));

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <PatientCardComponent
        patient={selectedPatient}
        registerBy={registerByText}
      />
      <div className="grid gap-6">
        <StudiesCardComponent idUser={Number(selectedPatient?.userId)} />
        <LabCard id={Number(selectedPatient?.userId)} />
        {/* <HistoryCardComponent /> */}
        {/* <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Monday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tuesday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Wednesday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Thursday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Friday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Saturday</span>
              <span>Closed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </CardContent>
      </Card> */}
        {/* <Card>
        <CardHeader>
          <CardTitle>Contact Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>Acme Medical Clinic</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>456 Oak St, Anytown USA</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>+1 (555) 555-5556</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Link className="text-blue-500 hover:underline" href="#">
                www.acmeclinic.com
              </Link>
            </div>
          </div>
        </CardContent>
      </Card> */}
      </div>
    </div>
  );
}
