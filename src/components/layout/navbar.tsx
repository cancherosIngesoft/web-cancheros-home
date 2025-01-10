"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contacto" },
    { href: "/terms", label: "Términos" },
  ];

  return (
    <nav className="bg-[#F0FFFA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#1A6B51]">
              <img src="/favicon.ico" alt="Logo" width={60} height={60} />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-[#1A6B51] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="default"
              size="lg"
              className="text-base font-medium"
              onClick={() => console.log("Iniciar sesión")}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-medium"
              onClick={() => console.log("Registrarse")}
            >
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide/Fade panel */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-50 bg-white">
          <div className="pt-20 pb-6 px-6 space-y-8">
            {/* Navigation Links - Mobile */}
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-medium text-gray-700 hover:text-[#1A6B51] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons - Mobile */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <Button
                variant="default"
                size="lg"
                className="w-full text-base font-medium"
                onClick={() => console.log("Iniciar sesión")}
              >
                Iniciar sesión
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-base font-medium "
                onClick={() => console.log("Registrarse")}
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
