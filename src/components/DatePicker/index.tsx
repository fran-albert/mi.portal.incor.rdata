import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../ui/input";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
export const CustomDatePicker = ({ props }: { props: any }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      selected={startDate}
      className="max-w-full"
      onChange={(date) => setStartDate(date as Date)}
      locale="es"
      customInput={props}
      dateFormat="d MMMM yyyy"
    />
  );
};
