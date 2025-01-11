import { clsx, type ClassValue } from "clsx"
import { AuthOptions } from "next-auth"
import { twMerge } from "tailwind-merge"
import Auth0Provider from "next-auth/providers/auth0";
import { DefaultSession, NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Profile } from "next-auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface ExtendedToken extends JWT {
    accessToken?: string
    isNewUser?: boolean
  }
  
  interface ExtendedSession extends DefaultSession {
    accessToken?: string
    user: {
      id: string
      isNewUser?: boolean
    } & DefaultSession["user"]
  }
  
  interface ExtendedProfile extends Profile {
    isNewUser?: boolean
  }
  
  export const authOptions: NextAuthOptions = {
    providers: [
      Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        issuer: process.env.AUTH0_ISSUER,
        authorization: { params: { scope: "openid email profile" } }
      })
    ],
    callbacks: {
        async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
      async session({ session, token }) {
        const newSession: typeof session & {accessToken?: string | null}  = Object.assign({}, session);
        newSession.accessToken = token.accessToken as string;
        return newSession;
    },
    //   async session({ session, token }) {
    //     return {
    //       ...session,
    //       accessToken: token.accessToken as string,
    //       user: {
    //         ...session.user,
    //         id: token.id as string,
    //         isNewUser: token.isNewUser as boolean | undefined
    //       }
    //     }
    //   },
      async signIn({ user, account, profile, }) {
        try {
          const isNewUser = (profile as ExtendedProfile)?.isNewUser
  
          if (isNewUser) {
             console.log('Nuevo usuario:', user.id, user.email)
            // Lógica para nuevo registro
            // const response = await fetch('https://tu-api-backend.com/signup', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ userId: user.id, email: user.email }),
            // })
            // Manejar la respuesta del registro
          } else {
            console.log('Inicio de sesión:', user.id)
            // Lógica para inicio de sesión
            // const response = await fetch('https://tu-api-backend.com/signin', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ userId: user.id }),
            // })
            // Manejar la respuesta del inicio de sesión
          }
  
          return true
        } catch (error) {
          console.error('Error en el proceso de autenticación:', error)
          return false
        }
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/api/auth/callback")) {
          return `${baseUrl}/reservar_cancha`
        } else if (url.startsWith("/")) {
          return `${baseUrl}${url}`
        } else if (new URL(url).origin === baseUrl) {
          return url
        }
        return baseUrl
      }
    },
    secret: process.env.AUTH_SECRET,
  }