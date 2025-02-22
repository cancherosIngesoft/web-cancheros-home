"use client"

import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import BallIcon from "@/components/icon/BallIcon"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { stat } from "fs"

export default function SignIn() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        const error = searchParams.get("error")
        const sessionExpired = searchParams.get("sessionExpired")
        const csrf = searchParams.get("csrf")

        if (error === "AccessDenied") {
            toast({
                title: "Acceso denegado",
                description: "No tienes permiso para acceder a esta página.",
                variant: "destructive",
            })
        } else if (sessionExpired === "true") {
            toast({
                title: "Sesión expirada",
                description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
                variant: "alert",
            })
        } else if (csrf === "true") {
            toast({
                title: "Error de seguridad",
                description: "Se detectó un problema de seguridad. Por favor, inicia sesión nuevamente.",
                variant: "destructive",
            })
            
        }
    }, [searchParams, toast])

    const handleSignIn = async () => {
        setIsLoading(true)
        try {
            const result = await signIn("auth0", { redirect: false })
            console.log(result)
            if (result?.error) {
                if (result.error === "OAuthSignin") {
                    toast({
                        title: "Error de autenticación",
                        description: "Hubo un problema al conectar con Auth0. Por favor, intenta de nuevo más tarde.",
                        variant: "destructive",
                    })
                } else {
                    toast({
                        title: "Error de inicio de sesión",
                        description: "No se pudo iniciar sesión. Por favor, verifica tus credenciales e intenta de nuevo.",
                        variant: "destructive",
                    })
                }
            }
            router.push("/reservar_cancha")
        } catch (error) {
            toast({
                title: "Error de red",
                description: "Hubo un problema de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (status === "loading" || isLoading) {
        return (
            <div className="w-full h-full flex row justify-center items-center">
                <div className="flex flex-row items-center gap-2">
                    <Spinner size={40} className="text-green-500" />
                    <span className="font-bold text-xl">Cargando...</span>
                </div>
            </div>
        )
    } else if (session && status === "authenticated") {
        router.push("/reservar_cancha")

    }

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-full bg-green-100 flex items-center justify-center"
        >
            {status === "unauthenticated" && !session && (
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <div className="text-center mb-8">
                        <Image src="/CANCHEROS.svg" alt="Cancheros Logo" width={150} height={150} className="mx-auto" />
                        <p className="text-gray-600">Tu portal para reservar canchas de fútbol</p>
                    </div>
                    <div className="space-y-4">
                        <Button
                            onClick={handleSignIn}
                            className="w-full h-16 text-lg font-bold bg-green-500 text-white flex-none rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            <BallIcon className="min-h-8 min-w-8" />
                            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            <BallIcon className="min-h-8 min-w-8" />
                        </Button>
                        <Link
                            href="/"
                            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                        >
                            Volver a la Página Principal
                        </Link>
                    </div>
                </div>
            )

            }


        </motion.div>
    )
}

