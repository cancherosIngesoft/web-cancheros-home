"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useGlobalStore } from "@/store"
import BallIcon from "../icon/BallIcon"
import SoccerField from "../icon/SoccerField"
import TeamShield from "../icon/TeamShield"
import { PanelClub } from "../club/PanelClub"

type NavItem = {
  icon: React.ReactNode
  route: string
}

const navItems: NavItem[] = [
  { icon: <BallIcon className="h-10 w-10 text-tertiary" />, route: "/reservar_cancha" },
  { icon: <SoccerField className="h-8 w-8 text-tertiary stroke-4" />, route: "/mis_reservas" },
]

export const LateralNavBar = () => {
  const [isOpenTeam, setIsOpenTeam] = useState(false)
  const [navbarWidth, setNavbarWidth] = useState(0)
  const navbarRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const authUser = useGlobalStore((state) => state.auth)

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarWidth(navbarRef.current.offsetWidth)
    }
  }, [])

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <>
      <div
        ref={navbarRef}
        className="flex flex-col justify-center align-center h-full w-full bg-gradient-to-b from-surface from-60% to-primary-80 to-80% py-4 border-r border-neutral-300"
      >
        <Link href="/" className="flex justify-center text-2xl font-bold text-[#1A6B51]">
          <Image src="/LogoWithOutTitle.png" alt="Logo" width={50} height={50} />
        </Link>
        <section className="flex flex-col items-center gap-4 mt-10">
          {authUser?.userRole === "duenio" && (
            <Link href="/mis_canchas">
              <Image src="/icons/miscanchas.svg" alt="Logo" width={50} height={50} />
            </Link>
          )}
        </section>

        {authUser?.userRole === "aficionado" && (

          <div className="flex-grow flex flex-col items-center gap-4">
            {navItems.map((item, index) => (
              <Link key={index} href={item.route}>
                {item.icon}
              </Link>
            ))}
            <div
              className="w-full h-10 flex flex-row justify-center cursor-pointer"
              onClick={() => setIsOpenTeam(!isOpenTeam)}
            >
              <TeamShield className=" text-white stroke-4" />
            </div>
          </div>

        )}


        <div className="flex flex-col items-center gap-4 mt-auto">
          <Avatar>
            {session?.user && session?.user.image ? (
              <AvatarImage src={session?.user?.image} alt={authUser?.name ?? "User"} />
            ) : (
              <AvatarFallback className="bg-surface">
                {session?.user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </div >
      <PanelClub isOpen={isOpenTeam} onClose={() => setIsOpenTeam(false)} navbarWidth={navbarWidth} />
    </>
  )
}

