import NextAuth, { DefaultSession } from "next-auth"

export type extendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER";
    isTwoFactorEnabled: boolean
}


declare module "next-auth" {
    interface Session {
      user: extendedUser;
    }
  }