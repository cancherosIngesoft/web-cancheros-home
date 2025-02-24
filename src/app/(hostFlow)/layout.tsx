import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-screen">
            {/* Barra lateral */}
            <nav className="fixed w-full h-16 md:relative md:top-0 md:left-0 md:h-full md:w-16">
                <LateralNavBar />
            </nav>

            {/* Contenido principal */}
            <main className="flex-1 pb-20 md:mt-0 md:h-full overflow-auto p-4 md:p-8">
                {children}
            </main>
        </div>
  );
}
