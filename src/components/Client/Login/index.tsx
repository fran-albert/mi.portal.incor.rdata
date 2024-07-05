"use client";
import React, { useState, useTransition } from "react";
import { loginSchema } from "@/validators/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/Input/Password/input";
import Link from "next/link";
import { loginAction } from "@/actions/auth.action";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    console.log(values);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/inicio");
      }
    });
  }

  return (
    <div className="w-96">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Bienvenido</h1>
            <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Correo Electrónico o D.N.I.
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="w-full"
                  variant="incor"
                  disabled={isPending}
                >
                  {isPending ? "Iniciando..." : "Iniciar sesión"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center text-muted-foreground">
            <Link href="/restablecer-contrase%C3%B1a">
              ¿Has olvidado tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
