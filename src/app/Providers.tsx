'use client'

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider >
                {children}
            </SessionProvider>
        </QueryClientProvider>

    );
}
export default Providers;