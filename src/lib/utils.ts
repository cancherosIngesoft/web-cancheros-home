import { AuthOptions } from "next-auth";
import { twMerge } from "tailwind-merge";
import Auth0Provider from "next-auth/providers/auth0";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { userManagement } from "@/actions/sessionManagement";
import { clsx, type ClassValue } from "clsx";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Extender el token JWT para incluir el rol y el accessToken
interface ExtendedToken extends JWT {
  accessToken?: string;
  role?: string;
  id?: string;
}

// Extender la sesión para incluir el rol y el accessToken
interface ExtendedSession extends Session {
  user: {
    role?: string;
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } & NonNullable<Session["user"]>;
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      return true;
    },

    async jwt({
      token,
      account,
      user,
    }: {
      token: ExtendedToken;
      account?: any;
      user?: User;
      id?: string;
    }): Promise<ExtendedToken> {
      if (user && !token.role && !token.id) {
        try {
          const response = await userManagement(user.email!, user.name!);
          if (response && response.rol) {
            let rol=""
            const idKey = Object.keys(response).find((key) => key.startsWith("id"))?? "id_usuario";
            if(response.rol === "capitan" || response.rol ==="aficionado" || response.rol ==="jugador"){
              rol = "jugador";
            }else{
              rol = response.rol;
            }
            token.role = rol;
            token.id = response[idKey]; // Guardar el ID del usuario
          }
        } catch (error) { }
      }
      if (account) {
        token.accessToken = account.access_token;
        console.log("account", token);
      }
      return token;
    },

    async session({
      session,
      token,
      user,
      newSession,
      trigger,
    }: {
      session: Session;
      token: JWT;
      user: User;
      newSession: any;
      trigger: "update";
    }): Promise<Session> {
      (session.user as ExtendedSession["user"]).role = token.role as
        | string
        | undefined;
      (session.user as ExtendedSession["user"]).id = token.id as
        | string
        | undefined;
      (session as ExtendedSession).accessToken = token.accessToken as
        | string
        | undefined;
      return session;
    },

    async redirect({
      url,
      baseUrl,
    }: {
      url: string;
      baseUrl: string;
    }): Promise<string> {
      if (url.startsWith("/api/auth/callback")) {
        return `${baseUrl}/reservar_cancha`;
      } else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return url.startsWith("/") ? `${baseUrl}${url}` : baseUrl;
    },
  },
  secret: process.env.AUTH_SECRET,
};
