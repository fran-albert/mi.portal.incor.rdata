"use server";
import { loginSchema } from "@/validators/login.schema";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
        const result = await signIn("credentials", {
            userName: values.userName,
            password: values.password,
            redirect: false,
        });
        if (result?.error) {
            throw new Error(result.error);
        }
        return { success: true, user: result?.user };
    } catch (error) {
        console.error("Error during login action:", error);
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        }
        return { error: "error 500" };
    }
};
