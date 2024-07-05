import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    roles?: string[];
    token?: string;
  }

  interface Session {
    user?: {
      id?: string;
      roles?: string[];
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
  }
}