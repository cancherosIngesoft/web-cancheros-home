import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/toaster";
import { AuthStateManager } from "@/components/auth/AuthStateManager";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cancheros",
  description: "Encuentra tu cancha de futbol más cercana en Bogotá",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-y-hidden antialiased bg-surface text-onSurface w-full h-dvh `}
      >
        <Providers>
          <AuthStateManager />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
