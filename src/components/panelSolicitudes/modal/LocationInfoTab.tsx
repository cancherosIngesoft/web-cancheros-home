import { LocationInfo } from "@/types/bussinesInformation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface LocationInfoTabProps {
  data: LocationInfo
}

export function LocationInfoTab({ data }: LocationInfoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>UBICACIÓN DEL NEGOCIO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          Google maps
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Localidad</Label>
            <Input value={data.locality} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Dirección</Label>
            <Input value={data.address} readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

