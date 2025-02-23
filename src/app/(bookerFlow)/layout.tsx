import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function BookerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col-reverse md:flex-row h-screen w-screen">
            {/* Barra lateral */}
            <nav className="fixed w-full h-16 md:relative md:top-0 md:left-0 md:h-full md:w-16 z-20">
                <LateralNavBar />
            </nav>

            {/* Contenido principal */}
            <main className="flex-1 pb-20 md:mt-0 pt-8 md:pt-0   md:h-full overflow-auto p-6 md:p-8 z-0">
                {children}
            </main>
        </div>
    );
}