import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function BookerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-screen">
            {/* Barra lateral fija */}
            <nav className="top-0 left-0 h-full w-16 relative">
                <LateralNavBar />
            </nav>

            {/* Contenido principal */}
            <main className="flex-1 ml-8 h-full overflow-auto p-12 ">
                {children}
            </main>
        </div>
    );
}
