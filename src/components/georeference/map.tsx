"use client"
import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { MapMarker } from "./mapMarker"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const BOGOTA_COORDS = { lat: 4.60971, lng: -74.08175 }

// Definir el tipo para los marcadores
type Marker = {
  id?: string
  lat: number
  lng: number
  text?: string
  calification?: number
  priceRange?: string[]
}

export default function CustomMap({
  center = BOGOTA_COORDS,
  markers = [{ lat: 4.60971, lng: -74.08175 }],
  zoom = 12,
  style = { width: "50vw", height: "50vh" },
  showInfoWindow = false,
  gestureHandling = "none",
}: {
  center?: { lat: number; lng: number }
  zoom?: number
  style?: { width: string; height: string }
  markers?: Marker[]
  showInfoWindow?: boolean
  gestureHandling?: "none" | "greedy" | "cooperative" | "auto"
}) {
  const [currentCenter, setCurrentCenter] = useState(center)
  const [currentMarkers, setCurrentMarkers] = useState(markers)
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null)

  useEffect(() => {
    setCurrentCenter(center)
    setCurrentMarkers(markers)
  }, [center, markers])

  // Combine the provided style with a lower z-index
  

  return (
    <div  >
      <APIProvider apiKey={API_KEY as string} >
        <Map
          style={style}
          defaultCenter={currentCenter}
          defaultZoom={zoom}
          gestureHandling={gestureHandling}
          cameraControl={false}
          disableDefaultUI={true}
          zoomControl={true}
          streetViewControl={true}
        >
          {showInfoWindow &&
            currentMarkers.map((marker, index) => (
              <MapMarker
                key={index}
                marker={marker.id ? marker : { id: index.toString(), ...marker }}
                index={index}
                selectedMarker={selectedMarker}
                setSelectedMarker={setSelectedMarker}
              />
            ))}
          {!showInfoWindow && <Marker position={currentCenter} icon={"/green_pin.svg"} />}
        </Map>
      </APIProvider>
    </div>
  )
}

