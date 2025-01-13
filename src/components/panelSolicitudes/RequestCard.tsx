import { Mail, MapPin, Phone, Store, User } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Request } from '@/actions/dashboardRequest'

interface RequestCardProps {    
  request: Request
  isPending?: boolean
}

export function RequestCard({ request, isPending = true }: RequestCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex items-center gap-6 bg-white shadow-lg">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
          <Store className="w-6 h-6 text-primary-40" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{request.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{request.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{request.phone}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{request.businessName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{request.address}</span>
            </div>
          </div>
        </div>

        <Button 
          hidden={!isPending}
          className='w-32'

        >
          Ver solicitud
        </Button>
      </CardContent>
    </Card>
  )
}

