"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, CircleDollarSign, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useGlobalStore } from "@/store";
import BallIcon from "../icon/BallIcon";
import TeamShield from "../icon/TeamShield";
import { PanelClub } from "../club/PanelClub";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavItem = {
  icon: React.ReactNode;
  route: string;
  label: string;
};

const navItems: NavItem[] = [
  {
    icon: <BallIcon className="w-10 h-10 text-tertiary md:w-10 md:h-10" />,
    route: "/reservar_cancha",
    label: "Reservar Cancha",
  },
  {
    icon: (
      <Image
        className="w-10 h-10 md:w-10 md:h-10"
        src="/icons/miscanchas.svg"
        alt="Mis Reservas"
        width={40}
        height={40}
      />
    ),
    route: "/mis_reservas",
    label: "Mis Reservas",
  },
];

export const LateralNavBar = () => {
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [navbarDimensions, setNavbarDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const authUser = useGlobalStore((state) => state.auth);
  const resizeObserver = useRef<ResizeObserver>();

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarDimensions({
          width: navbarRef.current.offsetWidth,
          height: navbarRef.current.offsetHeight,
        });
      }
    };

    if (navbarRef.current) {
      resizeObserver.current = new ResizeObserver(handleResize);
      resizeObserver.current.observe(navbarRef.current);
      handleResize();
    }

    return () => {
      resizeObserver.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const currentScroll = window.scrollY;

        if (navbarRef.current) {
          if (currentScroll > lastScrollY) {
            // Scroll hacia abajo
            navbarRef.current.style.transform = "translateY(100%)";
          } else {
            // Scroll hacia arriba
            navbarRef.current.style.transform = "translateY(0)";
          }
        }
        setLastScrollY(currentScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      // Primero limpiar el estado global
      localStorage.clear();
      // Usar signOut con la configuración correcta
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const IconWrapper = ({
    children,
    label,
  }: {
    children: React.ReactNode;
    label: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group rounded-lg p-2 hover:bg-primary-95 transition-colors duration-200">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="border-[1px] border-gray-400 bg-gray-100"
          side="right"
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div
      ref={navbarRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full flex-row border-t border-neutral-300 bg-primary-95 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-auto md:flex-col md:justify-between md:border-r md:bg-gradient-to-b md:from-surface md:from-60% md:to-primary-80 md:to-80% md:py-4"
      style={{
        maxHeight: "100dvh",
        willChange: "transform",
        WebkitTransform: "translateZ(0)",
      }}
    >
      {/* Contenido superior */}
      <section className="flex flex-row items-center justify-center gap-2 md:flex-col md:gap-4 w-full">
        <Link
          href="/"
          className="hidden justify-center font-bold text-[#1A6B51] md:mt-4 md:flex"
        >
          <Image
            src="/LogoWithOutTitle.png"
            alt="Logo"
            width={50}
            height={50}
            priority
          />
        </Link>

        {authUser?.userRole === "duenio" && (
          <>
            <IconWrapper label="Mis Canchas">
              <Link href="/mis_canchas">
                <Image
                  className="w-10 h-10 md:w-10 md:h-10"
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
                  className="w-10 h-10 md:w-10 md:h-10"
                  src="/icons/booking_logo.svg"
                  alt="Reservas Negocio"
                  width={40}
                  height={40}
                />
              </Link>
            </IconWrapper>
            <IconWrapper label="Panel de Negocio">
              <Link
                href="/panel_negocio"
                className="flex items-center justify-center"
              >
                <Image
                  className="w-8 h-8 md:w-10 md:h-10"
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
                <CircleDollarSign className="w-8 h-8 text-green-800 md:w-10 md:h-10" />
              </Link>
            </IconWrapper>
          </>
        )}

        {authUser?.userRole === "jugador" && (
          <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-4 w-full">
            {navItems.map((item, index) => (
              <IconWrapper key={index} label={item.label}>
                <Link href={item.route} className="h-fit w-fit">
                  {item.icon}
                </Link>
              </IconWrapper>
            ))}
            <IconWrapper label="Equipo">
              <div
                className="cursor-pointer"
                onClick={() => setIsOpenTeam(!isOpenTeam)}
              >
                <TeamShield className="w-10 h-10 text-tertiary stroke-4 md:w-10 md:h-10" />
              </div>
            </IconWrapper>
            <IconWrapper label="Notificaciones">
              <Link
                href="/notificaciones"
                className="flex items-center justify-center group-hover:text-green-600 transition-colors"
              >
                <Bell className="w-8 h-8 text-green-800 md:w-10 md:h-10" />
              </Link>
            </IconWrapper>
          </div>
        )}
      </section>

      {/* Sección inferior */}
      <div className="ml-4 flex flex-row items-center gap-4 md:ml-0 md:flex-col">
        <Avatar className="hidden md:block">
          {session?.user?.image ? (
            <AvatarImage
              src={session.user.image}
              alt={authUser?.name || "Usuario"}
            />
          ) : (
            <AvatarFallback className="bg-surface">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
        <IconWrapper label="Cerrar Sesión">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="hover:bg-transparent"
          >
            <LogOut className="h-6 w-6 text-gray-700 group-hover:text-primary-70" />
          </Button>
        </IconWrapper>
      </div>

      {/* Panel del club */}
      {authUser?.userRole === "jugador" && (
        <PanelClub
          isOpen={isOpenTeam}
          onClose={() => setIsOpenTeam(false)}
          navbarWidth={navbarDimensions.width}
          navbarHeight={navbarDimensions.height}
        />
      )}
    </div>
  );
};
