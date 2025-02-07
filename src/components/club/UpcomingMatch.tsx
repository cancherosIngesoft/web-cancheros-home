"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Timer } from "lucide-react"
import Link from "next/link"

export default function UpcomingMatch() {
  return (
    <div className=" rounded-lg flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Próximos partidos</h2>
      <div className="bg-white p-6 rounded-md">
      <Card >
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5iJJ3gl0vu6h7cb0KssOZMySIxxwHT.png"
              alt="Campo de fútbol"
              className="w-full aspect-video object-cover rounded-lg"
            />
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Revancha</h3>
                  <div className="text-2xl font-bold text-green-600">$ 200.000</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <Link href="#" className="hover:underline">
                    https://www.maps...
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12pm-2pm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  <span>2 horas</span>
                </div>
              </div>
              <Button className="w-full sm:w-auto">
                Más detalles
                <span className="sr-only">sobre el partido</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      

    </div>


  )
}

