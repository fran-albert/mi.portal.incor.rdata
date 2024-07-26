import React, { Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
import RequestEmailPassword from "@/sections/Auth/Request-Mail-Password";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
};
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<Loading isLoading />}>
      <RequestEmailPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
