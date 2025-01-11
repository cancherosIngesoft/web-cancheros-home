'use client'
import { Button } from "@/components/ui/button";
import { constants } from "buffer";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()
  const handleSingUp=()=>{
    signIn('auth0', {
      callbackUrl: '/reservar_cancha',
      authorizationParams: {
        screen_hint: 'signup',
        prompt: 'login'
      }
    })
  }
  const handleSingIn=()=>{
    signIn('auth0', { callbackUrl: '/reservar_cancha' ,
      authorizationParams: {
        prompt: 'login'
      }
    })
  }

  return (
    <>
      {/** botones de prueba para el registro e inicio de la sesion */}
      <div className="flex flex-col items-center justify-center gap-6">
        <Button onClick={handleSingUp}>
          Registro con Auth0
        </Button>
        <Button onClick={handleSingIn}>
          iniciar sesion con Auth0
        </Button>

      </div>

    </>

  )
}
