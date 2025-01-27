import { BusinessInfo } from "@/types/bussinesInformation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText } from 'lucide-react'

interface BusinessInfoTabProps {
  data: BusinessInfo
}

export function BusinessInfoTab({ data }: BusinessInfoTabProps) {
  return (
    <Card className="shadow-none border-none">
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label className="font-semibold" >Nombre del negocio</Label>
            <Input value={data.name} readOnly />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-semibold">Numero de canchas</Label>
              <Input value={data.courtCount} readOnly />
            </div>
            <div className="space-y-4">
              <Label className="font-semibold">Tipo de canchas</Label>
              <div className="flex gap-2">
                {data.courtTypes.map((type) => (
                  <Badge key={type} >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Teléfono</Label>
            <Input value={data.phone} readOnly />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Legalización</Label>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground font-semibold">RUT</Label>
              {data.legalDocuments.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.url}
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  {doc.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

