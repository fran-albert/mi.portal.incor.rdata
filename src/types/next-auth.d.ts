// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string[];
    token?: string;
  }

  interface Session {
    user?: {
      id?: string;
      role?: string[];
    } & DefaultSession["user"];
    accessToken?: string;
  }
}
