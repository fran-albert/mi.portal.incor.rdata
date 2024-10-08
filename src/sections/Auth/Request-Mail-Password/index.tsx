"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { RequestEmailPasswordSchema } from "@/validators/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserMutations } from "@/hooks/User/useUserMutations";
type FormValues = z.infer<typeof RequestEmailPasswordSchema>;

function RequestEmailPassword() {
  const form = useForm<FormValues>({
    resolver: zodResolver(RequestEmailPasswordSchema),
  });
  const {
    formState: { errors },
  } = form;
  const { forgotPasswordMutation } = useUserMutations();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const sendMailPromise = forgotPasswordMutation.mutateAsync(data);
      toast.promise(sendMailPromise, {
        loading: "Enviando correo electrónico...",
        success: "Correo enviado éxito!",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al enviar el enlace. Inténtalo de nuevo.", error);
    }
  };

  return (
    <Card className="mx-auto max-w-md mt-10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <LockIcon className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">
            Restablecer Contraseña
          </CardTitle>
        </div>
        <CardDescription>
          Ingrese su dirección de correo electrónico y le enviaremos un enlace
          para restablecer su contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ingrese su correo electrónico..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mx-auto w-1/2 md:w-1/2" variant={"incor"}>
                <SendIcon className="mr-2 h-4 w-4" />
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RequestEmailPassword;

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
