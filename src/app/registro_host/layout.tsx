import { LateralNavBar } from "@/components/layout/LateralNavBar";
import Navbar from "@/components/layout/navbar";

export default function HostRequestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col-reverse md:flex-col h-screen w-screen">
        <Navbar />
            {/* Contenido principal */}
            <main className="flex-1 pb-20 pt-8 md:pb-0   md:h-full overflow-auto p-6 md:p-8 z-0">
                {children}
            </main>
        </div>
    );
}