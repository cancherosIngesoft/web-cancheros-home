import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GenericReservaCard({
  reservation,
}: {
  reservation: any;
}) {
  return (
    <Card key={reservation.id}>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative h-24 w-32 flex-shrink-0">
          <Image
            src="/cancheros.svg"
            alt={reservation.field}
            className="rounded-lg object-cover"
            width={128}
            height={96}
          />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold">{reservation.field}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            {reservation.user}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            {reservation.date}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4" />
            {reservation.location}
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">
            $ {reservation.amount.toLocaleString()}
          </div>
          <Button
            variant="secondary"
            className="mt-2 bg-green-700 text-white hover:bg-green-800"
          >
            {reservation.status}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
