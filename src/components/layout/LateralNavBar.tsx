'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

// Tipo para los elementos de navegación
type NavItem = {
  icon: React.ElementType;
  route: string;
};

// Diccionario de ejemplo para los iconos y rutas
const navItems: NavItem[] = [
  // Aquí puedes agregar tus iconos y rutas cuando sean relevantes
  // Por ejemplo: { icon: Home, route: '/' }
];

export const LateralNavBar = () => {
  const {data: session} = useSession()
  const handleLogout = () => {
    
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-surface from-60% to-primary-80 to-80% py-4 border-r border-neutral-300">
      <div className="flex-grow flex flex-col items-center gap-4">
        {navItems.map((item, index) => (
          <Link key={index} href={item.route}>
            <Button variant="ghost" size="icon">
              <item.icon className="h-6 w-6" />
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 mt-auto">
        <Avatar>
          {session?.user && session?.user.image ? (
            <AvatarImage src={session?.user?.image} alt={session?.user?.name ?? 'User'} />
          ) : (
            <AvatarFallback className='bg-surface'>{session?.user?.name?.charAt(0)?.toUpperCase() ?? 'U'}</AvatarFallback>
          )}
        </Avatar>
        <Button variant="ghost" size="icon" onClick={() => signOut()}>
          <LogOut className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

