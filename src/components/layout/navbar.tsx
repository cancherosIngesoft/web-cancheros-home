"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contacto" },
    { href: "/terms", label: "Términos" },
    { href: "/sobreNosotros", label: "Sobre Nosotros" },
  ];
  const handleSingUp = () => {
    signIn("auth0", {
      callbackUrl: "/reservar_cancha",
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
      },
    });
  };
  const handleSingIn = () => {
    signIn("auth0", {
      callbackUrl: "/reservar_cancha",
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <nav className="bg-[#F0FFFA] border-b border-gray-200 w-full mx-auto px-6 lg:px-8 ">
      <div className="w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#1A6B51]">
              <Image
                src="/LogoWithOutTitle.png"
                alt="Logo"
                width={60}
                height={60}
              />
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
              onClick={handleSingIn}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-medium"
              onClick={handleSingUp}
            >
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide/Fade panel */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-white">
            <div className="pt-20 pb-6 px-6 space-y-8">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Links - Mobile */}
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium text-gray-700 hover:text-[#1A6B51] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
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
                  onClick={handleSingIn}
                >
                  Entrar
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full text-base font-medium"
                  onClick={handleSingUp}
                >
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
