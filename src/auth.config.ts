import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
var jwt = require("jsonwebtoken");

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        userName: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credenciales recibidas:", credentials);
        const userName = credentials?.userName;
        const password = credentials?.password;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}account/login`, {
          method: "POST",
          body: JSON.stringify({
            userName,
            password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          console.error("Respuesta del servidor no OK:", res);
          throw new Error("No se pudo iniciar sesión. Credenciales incorrectas.");
        }

        const data = await res.json();
        console.log("Datos recibidos del backend:", data);

        if (!data.token) {
          console.error("Token no recibido del backend.");
          throw new Error("No se pudo iniciar sesión");
        }

        const decoded = jwt.decode(data.token);
        console.log("Token decodificado:", decoded);

        if (!decoded) {
          console.error("Error al decodificar el token.");
          throw new Error("Error al decodificar el token");
        }

        return {
          token: data.token,
          id: decoded.Id,
          email: decoded.Email,
          roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };
      },
    }),
  ],
} satisfies NextAuthConfig;