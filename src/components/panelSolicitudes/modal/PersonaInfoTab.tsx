import { PersonalInfo } from "@/types/bussinesInformation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PersonalInfoTabProps {
  data: PersonalInfo
}

export function PersonalInfoTab({ data }: PersonalInfoTabProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Input value={data.documentType} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Numero de documento</Label>
              <Input value={data.documentNumber} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Nacimiento</Label>
              <Input value={data.birthDate} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={data.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Apellido</Label>
              <Input value={data.lastName} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email de contacto</Label>
              <Input value={data.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input value={data.phone} readOnly />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

