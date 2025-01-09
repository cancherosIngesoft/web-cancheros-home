import { clsx, type ClassValue } from "clsx"
import { AuthOptions } from "next-auth"
import { twMerge } from "tailwind-merge"
import Auth0Provider from "next-auth/providers/auth0";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const authOptions:AuthOptions = {
  providers: [
    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        issuer: process.env.AUTH0_ISSUER_BASE_URL!
    })
],
callbacks: {
    

    async jwt({ token, user, account, profile }) {
        if (account?.accessToken) {
            token.accessToken = account.accessToken;
        }
        return token;
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //     if (account && account.provider === 'auth0') {
    //         const res = await fetch(`${process.env.API_URL}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: user.email
    //             })
    //         })
    //         const data = await res.json()
    //         if (res.ok && data) {
    //             return data
    //         }
    //     }
    //     return false
    // }

}

}
