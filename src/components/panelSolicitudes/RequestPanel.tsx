'use client'

import { Store } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchRequestsOwnersPending, RequestsOwners } from '@/actions/dashboardRequest'
import { PendingRequests } from './PendingRequest'
import { RejectedRequests } from './RejectedRequest'


export default function RequestPanel({ initialPendingRequests }: { initialPendingRequests: RequestsOwners[] }) {
    const [activeTab, setActiveTab] = useState('pending')

    const [enabled, setEnabled] = useState(false);

    const { data: pendingRequests } = useQuery({
        queryKey: ['pendingRequests'],
        queryFn: fetchRequestsOwnersPending,
        initialData: initialPendingRequests,
        retry: 1,
        enabled, // La consulta no se ejecutará automáticamente
    });

    // Habilitar la consulta manualmente si es necesario
    useEffect(() => {
        if (!enabled) {
            setEnabled(true); // Esto activa la consulta
        }
    }, [enabled]);



    const handleTabChange = (value: string) => {
        setActiveTab(value)
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
                <Store className="w-8 h-8 text-primary-35" />
                <h1 className="text-2xl font-semibold text-primary-35">SOLICITUDES</h1>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="pending" className="w-full flex-col justify-center align-center">
                <TabsList className="w-full mb-6 h-10 bg-white">
                    <TabsTrigger value="pending" className="flex-1 font-semibold">
                        Solicitudes pendientes
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="flex-1 font-semibold">
                        Solicitudes rechazadas
                    </TabsTrigger>
                </TabsList>
                <div >
                    <TabsContent value="pending">
                        <PendingRequests requests={pendingRequests} />
                    </TabsContent>

                    <TabsContent value="rejected">

                        <RejectedRequests />

                    </TabsContent>
                </div>

            </Tabs>
        </div>
    )
}

