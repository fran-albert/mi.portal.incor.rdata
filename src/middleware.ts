import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

// const publicRoutes = ["/", "/prices"];
const authRoutes = ["/iniciar-sesion"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    console.log({ isLoggedIn, path: nextUrl.pathname });

    // Permitir todas las rutas de API de autenticación
    if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
        return NextResponse.next();
    }

    // Permitir acceso a rutas públicas sin importar el estado de autenticación
    //   if (publicRoutes.includes(nextUrl.pathname)) {
    //     return NextResponse.next();
    //   }

    // Redirigir a /inicio si el usuario está logueado y trata de acceder a rutas de autenticación
    if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/inicio", nextUrl));
    }

    // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
    if (
        !isLoggedIn &&
        !authRoutes.includes(nextUrl.pathname)
        // !publicRoutes.includes(nextUrl.pathname)
    ) {
        return NextResponse.redirect(new URL("/iniciar-sesion", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};