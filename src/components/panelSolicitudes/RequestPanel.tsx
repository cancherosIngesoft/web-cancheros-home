'use client'

import { Store } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchRequestsOwnersPending, fetchRequestsOwnersRejected, RequestsOwners } from '@/actions/dashboardRequest'
import { PendingRequests } from './PendingRequest'
import { RejectedRequests } from './RejectedRequest'


export default function RequestPanel({ initialPendingRequests }:{initialPendingRequests: RequestsOwners[]}) {
    const [activeTab, setActiveTab] = useState('pending')

    const { data: pendingRequests } = useQuery({
        queryKey: ['pendingRequests'],
        queryFn: fetchRequestsOwnersPending,
        initialData: initialPendingRequests,
    })

    const {
        data: rejectedRequests,
        isLoading: isLoadingRejected
    } = useQuery({
        queryKey: ['rejectedRequests'],
        queryFn: fetchRequestsOwnersRejected,
        enabled: activeTab === 'rejected',
    })

    const handleTabChange = (value: string) => {
        setActiveTab(value)
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
                <Store className="w-8 h-8 text-primary-35" />
                <h1 className="text-2xl font-semibold text-primary-35">SOLICITUDES</h1>
            </div>

            <Tabs  value={activeTab} onValueChange={handleTabChange} defaultValue="pending" className="w-full flex-col justify-center align-center">
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
                        {isLoadingRejected ? (
                            <div className="text-center py-8">Cargando solicitudes rechazadas...</div>
                        ) : (
                            <RejectedRequests requests={rejectedRequests || []} />
                        )}
                    </TabsContent>
                </div>

            </Tabs>
        </div>
    )
}

