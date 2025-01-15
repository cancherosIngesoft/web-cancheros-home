import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-screen">
            {/* Barra lateral fija */}
            <nav className="fixed top-0 left-0 h-full w-16">
                <LateralNavBar />
            </nav>

            {/* Contenido principal */}
            <main className="flex-1 ml-16 h-full overflow-auto p-12 ">
                {children}
            </main>
        </div>
    );
}
