import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function BookerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-screen">
            {/* Barra lateral fija */}
            <nav className="fixed w-full bottom-0  md:top-0 md:left-0 md:bottom-none h-16 md:h-full md:w-16">
                <LateralNavBar />
            </nav>

            {/* Contenido principal */}
            <main className="flex-1 ml-2 md:ml-8 h-full overflow-auto p-4 md:p-12 ">
                {children}
            </main>
        </div>
    );
}
