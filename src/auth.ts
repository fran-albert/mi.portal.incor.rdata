import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = String(token.id);
      session.user.email = String(token.email);
      session.user.roles = token.roles;
      session.accessToken = token.accessToken as string;

      return session;
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true;
    },
  },
  pages: {
    signIn: "/iniciar-sesion",
  },
});
