import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";

// Layout de marketing - Solo para rutas dentro de (marketing)
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="marketing-layout">
        <nav className="bg-green-500">
          Este nav solo aparece en páginas de marketing
        </nav>

        {children}
      </div>
    </>
  );
}
