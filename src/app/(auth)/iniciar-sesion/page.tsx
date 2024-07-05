import LoginComponent from "@/components/Client/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
};
function LoginPage() {
  return <LoginComponent />;
}

export default LoginPage;
