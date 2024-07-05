"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";

function NewPasswordForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  //   const { data: session } = useSession();

  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setErrors([]);

  //     const responseNextAuth = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (responseNextAuth?.error) {
  //       setErrors(responseNextAuth.error.split(","));
  //       return;
  //     }

  //     router.push("/home");
  //   };

  //   useEffect(() => {
  //     if (session?.user) {
  //       router.push("/home");
  //     }
  //   }, [session, router]);

  return (
    <>
      <div className="flex items-start justify-center p-2 mt-40">
        <div className="bg-gray-100 p-4 md:p-14 rounded-lg shadow-md w-full md:max-w-lg">
          {/* <form className="flex flex-col gap-4" onSubmit={handleSubmit}> */}
          <form className="flex flex-col gap-4">
            <h1 className="text-lg md:text-2xl font-bold text-center">
              Nueva Contraseña
            </h1>

            {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul className="mb-0 text-red-500">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <Label htmlFor="current_password">Contraseña actual</Label>
                <PasswordInput
                  id="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <Label htmlFor="password">Nueva contraseña</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label htmlFor="password_confirmation">
                  Confirmar nueva contraseña
                </Label>
                <PasswordInput
                  id="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mx-auto w-1/2 md:w-1/2"
              variant="confirm"
            >
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPasswordForm;
