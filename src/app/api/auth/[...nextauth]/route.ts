import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import { authOptions } from "@/lib/nextAuthConfig"



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

