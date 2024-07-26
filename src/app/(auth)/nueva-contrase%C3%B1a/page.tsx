import Loading from "@/app/loading";
import ResetPasswordForm from "@/sections/Auth/Reset-Password/ResetPasswordForm";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<Loading isLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
