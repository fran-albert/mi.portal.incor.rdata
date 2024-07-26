import axios from "axios";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Credentials({
            credentials: {
                userName: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}account/login`, {
                        userName: credentials.userName,
                        password: credentials.password,
                    });
                    const user = response.data;
                    if (user && user.token) {
                        // Decoding JWT to extract user details
                        const decodedToken = JSON.parse(Buffer.from(user.token.split('.')[1], 'base64').toString());

                        return {
                            id: decodedToken.Id,
                            email: decodedToken.Email,
                            role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                            token: user.token
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error during authentication", error);
                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.accessToken = user.token;
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
} satisfies NextAuthConfig;
