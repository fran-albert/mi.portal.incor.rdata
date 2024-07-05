"use server";
import { signIn } from "@/auth";
import { loginSchema } from "@/validators/login.schema";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn("credentials", {
            redirect: false,
            userName: values.userName,
            password: values.password,
        });

        return { success: true };
    } catch (error) {
        return { error: "No se pudo iniciar sesión. Credenciales incorrectas." };
    }
};
