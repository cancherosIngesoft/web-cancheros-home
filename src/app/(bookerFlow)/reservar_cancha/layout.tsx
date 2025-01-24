import { LateralNavBar } from "@/components/layout/LateralNavBar";
import { Suspense } from "react";
import Loading from "./loading";


export default function BookerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    );
}
