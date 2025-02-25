"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, CircleDollarSign, LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useGlobalStore } from "@/store"
import BallIcon from "../icon/BallIcon"
import TeamShield from "../icon/TeamShield"
import { PanelClub } from "../club/PanelClub"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type NavItem = {
  icon: React.ReactNode
  route: string
  label: string
}

const navItems: NavItem[] = [
  {
    icon: <BallIcon className="md:w-10 md:h-10 w-10 h-10 text-tertiary " />,
    route: "/reservar_cancha",
    label: "Reservar Cancha",
  },
  {
    icon: (
      <Image
        className="md:w-10 md:h-10 w-10 h-10"
        src="/icons/miscanchas.svg"
        alt="Mis Reservas"
        width={40}
        height={40}
      />
    ),
    route: "/mis_reservas",
    label: "Mis Reservas",
  },
]

export const LateralNavBar = () => {
  const [isOpenTeam, setIsOpenTeam] = useState(false)
  const [navbarWidth, setNavbarWidth] = useState(0)
  const [navbarHeight, setNavbarHeight] = useState(0)
  const navbarRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const authUser = useGlobalStore((state) => state.auth)

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarWidth(navbarRef.current.offsetWidth)
      setNavbarHeight(navbarRef.current.offsetHeight)
    }
  }, [])

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" })
  }

  const IconWrapper = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild >
          <div className="group p-2 rounded-lg hover:bg-primary-95">{children}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-100 border-[1px] border-gray-400" side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <>
      <div
        ref={navbarRef}
        className="flex z-10 flex-row md:flex-col justify-center md:justify-between md:align-center h-full w-full bg-primary-95 md:bg-gradient-to-b from-surface from-60% to-primary-80 to-80% md:py-4 border-t md:border-r border-neutral-300"
      >
        <section className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-4">
          <Link href="/" className="md:flex justify-center font-bold text-[#1A6B51] hidden md:mt-4">
            <Image src="/LogoWithOutTitle.png" alt="Logo" width={50} height={50} />
          </Link>
          {authUser?.userRole === "duenio" && (
            <>
              <IconWrapper label="Mis Canchas">
                <Link href="/mis_canchas">
                  <Image
                    className="md:w-10 md:h-10 w-10 h-10"
                    src="/icons/miscanchas.svg"
                    alt="Mis Canchas"
                    width={40}
                    height={40}
                  />
                </Link>
              </IconWrapper>
              <IconWrapper label="Reservas Negocio">
                <Link href="/reservas_negocio">
                  <Image
                    className="md:w-10 md:h-10 w-10 h-10"
                    src="/icons/booking_logo.svg"
                    alt="Reservas Negocio"
                    width={40}
                    height={40}
                  />
                </Link>
              </IconWrapper>
              <IconWrapper label="Panel de Negocio">
                <Link href="/panel_negocio" className="flex items-center justify-center">
                  <Image
                    className="md:w-10 md:h-10 w-8 h-8"
                    src="/icons/negocios_icon.svg"
                    alt="Panel de Negocio"
                    width={40}
                    height={40}
                  />
                </Link>
              </IconWrapper>
              <IconWrapper label="Comisiones">
                <Link
                  href="/comisiones"
                  className="flex items-center justify-center group-hover:text-green-600 transition-colors"
                >
                  <CircleDollarSign className="md:w-10 md:h-10 w-8 h-8 text-green-800 " />
                </Link>
              </IconWrapper>
            </>
          )}

          {authUser?.userRole === "jugador" && (
            <div className="flex flex-row md:flex-col justify-center items-center w-full h-full  gap-2 md:gap-4">
              {navItems.map((item, index) => (
                <IconWrapper key={index} label={item.label}>
                  <Link href={item.route} className="h-fit w-fit">
                    {item.icon}
                  </Link>
                </IconWrapper>
              ))}
              <IconWrapper label="Equipo">
                <div className="cursor-pointer" onClick={() => setIsOpenTeam(!isOpenTeam)}>
                  <TeamShield className="md:w-10 md:h-10 w-10 h-10 text-tertiary stroke-4 " />
                </div>
              </IconWrapper>
              <IconWrapper label="Notificaciones">
                <Link
                  href="/notificaciones"
                  className="flex items-center justify-center group-hover:text-green-600 transition-colors"
                >
                  <Bell className="md:w-10 md:h-10 w-8 h-8 text-green-800 " />
                </Link>
              </IconWrapper>
            </div>
          )}
        </section>

        <div className="flex flex-row md:flex-col items-center ml-4 md:ml-0 gap-4">
          <Avatar className="hidden md:block">
            {session?.user && session?.user.image ? (
              <AvatarImage src={session?.user?.image} alt={authUser?.name ?? "User"} />
            ) : (
              <AvatarFallback className="bg-surface">
                {session?.user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <IconWrapper label="Cerrar Sesión">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-6 w-6 group-hover:text-primary-70" />
            </Button>
          </IconWrapper>
        </div>

        {authUser?.userRole === "jugador" && (
          <PanelClub
            isOpen={isOpenTeam}
            onClose={() => setIsOpenTeam(false)}
            navbarWidth={navbarWidth}
            navbarHeight={navbarHeight}
          />
        )}
      </div>
    </>
  )
}

