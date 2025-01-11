'use client'
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()


  return (
    <>
      {/** botones de prueba para el registro e inicio de la sesion */}
      <div className="flex flex-col items-center justify-center gap-6">
        <Button onClick={() => signIn('auth0', {
          callbackUrl: '/reservar_cancha',
          authorizationParams: {
            screen_hint: 'signup',
            prompt: 'login'
          }
        })}>
          Registro con Auth0
        </Button>
        <Button onClick={() => signIn('auth0', { callbackUrl: '/reservar_cancha' ,
          authorizationParams: {
            prompt: 'login'
          }
        })}>
          iniciar sesion con Auth0
        </Button>

      </div>

    </>

  )
}
