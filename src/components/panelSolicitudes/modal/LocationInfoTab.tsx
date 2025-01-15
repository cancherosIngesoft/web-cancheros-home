import { LocationInfo } from "@/types/bussinesInformation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import CustomMap from "@/components/georeference/map";

interface LocationInfoTabProps {
  data: LocationInfo;
}

export function LocationInfoTab({ data }: LocationInfoTabProps) {
  const center = { lat: data.coordinates.lat, lng: data.coordinates.lng };
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle>UBICACIÓN DEL NEGOCIO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-row align-top">
        <div className="aspect-video w-2/3 relative rounded-lg overflow-hidden">
          <CustomMap
            center={center}
            style={{ width: "25vw", height: "30vh" }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label className="font-semibold">Localidad</Label>
            <Input value={data.locality} readOnly />
          </div>
          <div className="space-y-2">
            <Label className="font-semibold">Dirección</Label>
            <Input value={data.address} readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
