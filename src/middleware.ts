import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ['/iniciar-sesion', '/registrarse']
export default middleware((req) => {
    const { nextUrl, auth } = req;
    const isLoggedIn = !!auth?.user;

    if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        return NextResponse.redirect(new URL('/iniciar-sesion', nextUrl));
    }

})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};