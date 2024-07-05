import { z } from 'zod';

export const loginSchema = z.object({
    userName: z.union([
        z.string().email("Email no válido"),
        z.string().regex(/^\d{7,8}$/, "DNI no válido")
    ]).refine(value => value.trim() !== '', {
        message: "Email o DNI es requerido",
    }),
    password: z.string({
        required_error: 'Contraseña es requerida',
    }).min(4, {
        message: 'Contraseña debe tener al menos 4 caracteres',
    }),
});
