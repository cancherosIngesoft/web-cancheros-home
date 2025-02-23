"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useGlobalStore } from "@/store";
import BallIcon from "../icon/BallIcon";
import SoccerField from "../icon/SoccerField";
import TeamShield from "../icon/TeamShield";
import { PanelClub } from "../club/PanelClub";
import { useRouter } from "next/navigation";

type NavItem = {
  icon: React.ReactNode;
  route: string;
};

const navItems: NavItem[] = [
  {
    icon: <BallIcon className="md:w-10 md:h-10 w-10 h-10 text-tertiary" />,
    route: "/reservar_cancha",
  },
  {
    icon: <Image
    className="md:w-10 md:h-10 w-10 h-10"
    src="/icons/miscanchas.svg"
    alt="Logo"
    width={40}
    height={40}
  />,
    route: "/mis_reservas",
  },
];

export const LateralNavBar = () => {
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [navbarWidth, setNavbarWidth] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const authUser = useGlobalStore((state) => state.auth);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarWidth(navbarRef.current.offsetWidth);
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div
        ref={navbarRef}
        className="flex  z-10 flex-row md:flex-col justify-center md:justify-between md:align-center h-full w-full bg-primary-95 md:bg-gradient-to-b from-surface from-60% to-primary-80 to-80% md:py-4  border-t md:border-r border-neutral-300"
      >
        
        <section className="flex flex-row md:flex-col items-center justify-center  gap-8  md:gap-4 ">
        <Link
          href="/"
          className="md:flex justify-center font-bold text-[#1A6B51] hidden md:mt-4"
        >
          <Image
            src="/LogoWithOutTitle.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </Link>
          {authUser?.userRole === "duenio" && (
            <>
              <Link href="/mis_canchas">
                <Image
                  className="md:w-10 md:h-10 w-10 h-10"
                  src="/icons/miscanchas.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/reservas_negocio">
                <Image
                  className="md:w-10 md:h-8 w-8 h-10"
                  src="/icons/booking_logo.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="/panel_negocio"
                className="flex items-center justify-center"
              >
                <Image
                  className="md:w-10 md:h-10 w-8 h-8"
                  src="/icons/negocios_icon.svg"
                  alt="Panel de Negocio"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="/comisiones"
                className="flex items-center justify-center  hover:text-green-600 transition-colors"
              >
                <CircleDollarSign className="md:w-10 md:h-10 w-8 h-8 text-green-800" />
              </Link>
            </>
          )}

          {authUser?.userRole === "jugador" && (
            <div className="flex flex-row md:flex-col justify-center items-center w-full h-full gap-8">
            {navItems.map((item, index) => (
                <Link key={index} href={item.route} className="h-fit w-fit">
                  {item.icon}
                </Link>
              ))}
              <div
                className=" cursor-pointer"
                onClick={() => setIsOpenTeam(!isOpenTeam)}
              >
                <TeamShield className="md:w-10 md:h-10 w-10 h-10 text-tertiary stroke-4" />
              </div>
            </div>
              
            
          )}
        </section>



        <div className="flex  flex-row md:flex-col items-center ml-4 md:ml-0 gap-4 ">
          <Avatar className="hidden md:block">
            {session?.user && session?.user.image ? (
              <AvatarImage
                src={session?.user?.image}
                alt={authUser?.name ?? "User"}
              />
            ) : (
              <AvatarFallback className="bg-surface">
                {session?.user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
        <PanelClub
        isOpen={isOpenTeam}
        onClose={() => setIsOpenTeam(false)}
        navbarWidth={navbarWidth}
        navbarHeight={navbarHeight}
      />
      </div>
      
    </>
  );
};
