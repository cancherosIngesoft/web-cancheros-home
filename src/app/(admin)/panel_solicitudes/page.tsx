'use client'

import { Store } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PendingRequests } from '@/components/panelSolicitudes/PendingRequest'
import { RejectedRequests } from '@/components/panelSolicitudes/RejectedRequest'

interface Request {
    id: string
    name: string
    email: string
    phone: string
    businessName: string
    address: string
}

const mockRequests: Request[] = [
    {
        id: "1",
        name: "Juan Alberto espitia",
        email: "juan@gmail.com",
        phone: "300 721 1345",
        businessName: "La futbolera",
        address: "Calle 77b #123-A"
    },
    {
        id: "2",
        name: "Armando Quintas",
        email: "aquintas@gmail.com",
        phone: "310 721 1245",
        businessName: "La futbolera",
        address: "Diagonal 27 A"
    },
    {
        id: "3",
        name: "Armando Bulla",
        email: "bulla@gmail.com",
        phone: "300 711 1245",
        businessName: "La futbolera",
        address: "Calle 12 #13-A"
    }
]
const panel_solicitudes = () => {   
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
                <Store className="w-8 h-8 text-primary-35" />
                <h1 className="text-2xl font-semibold text-primary-35">SOLICITUDES</h1>
            </div>

            <Tabs defaultValue="pending" className="w-full flex-col justify-center align-center">
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
                        <PendingRequests />
                    </TabsContent>

                    <TabsContent value="rejected">
                        <RejectedRequests />
                    </TabsContent>
                </div>

            </Tabs>
        </div>
    )
}
export default panel_solicitudes