import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
        <div className="w-full h-full flex flex-row">
            <nav className="w-16 h-full">
                <LateralNavBar />
            </nav> 
            <main className="flex-1 h-full p-8">
            {children}
        </main>
        </div>

    );
}