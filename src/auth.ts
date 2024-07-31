import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: { strategy: "jwt", maxAge: 3600 },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.accessToken = user.token;
                token.exp = Math.floor(Date.now() / 1000) + 3600;
            }

            if (token.exp && Date.now() / 1000 > token.exp) {
                return {};
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    role: token.role,
                };
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/iniciar-sesion",
    },
});
