import { Store } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkeletonRequest } from '@/components/panelSolicitudes/SkeletonRequest'


export default function Loading() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center gap-2 mb-6">
        <Store className="w-8 h-8 text-emerald-600" />
        <h1 className="text-2xl font-semibold text-emerald-600">SOLICITUDES</h1>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="pending" className="flex-1">
            Solicitudes pendientes
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex-1">
            Solicitudes rechazadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            <SkeletonRequest />
            <SkeletonRequest />
            <SkeletonRequest />
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="text-center py-8 text-gray-500">
            Cargando solicitudes...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

