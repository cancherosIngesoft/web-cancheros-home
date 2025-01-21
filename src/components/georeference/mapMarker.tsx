import { Marker, InfoWindow } from "@vis.gl/react-google-maps"
import { Button } from "@/components/ui/button"
import { Star,DollarSign } from "lucide-react"


type MapMarkerProps = {
  marker: {
    id?: string;
    lat: number;
    lng: number;
    text?: string;
    calification?: number;
    priceRange?: string;
  }
  index: number
  selectedMarker: number | null
  setSelectedMarker: (index: number | null) => void

}

export function MapMarker({ marker, index, selectedMarker, setSelectedMarker }: MapMarkerProps) {
  const onGoToField = (id: string) => {
    console.log("Go to field", id)
  }
  return (
    <div key={index}>
      <Marker position={marker} icon={"/green_pin.svg"} onClick={() => setSelectedMarker(index)} />
      {selectedMarker === index && (
        <InfoWindow
          position={marker}
          onCloseClick={() => setSelectedMarker(null)}
          headerContent={<div className="text-lg font-bold text-primary py-2">{marker.text}</div>}

        >
          <>

            <div className="w-64 ">
              <div className="flex items-center mb-2">
                <Star size={20} className="text-yellow-400 mr-1" />
                <span className="font-medium">{(marker.calification ?? 0).toFixed(1)}</span>
              </div>
              <div className="flex items-center mb-2">
                <DollarSign size={20} className="text-green-400 mr-1" />
                <span className="font-medium">{marker.priceRange}</span>
              </div>
              
              <div className="flex justify-center w-full">
                <Button
                  onClick={() => marker.id && onGoToField(marker.id)}
                  className="w-1/2 text-secondary-40 hover:border-gray-300 hover:border-b-2 hover:bg-secondary-95"
                  variant={"ghost"}
                  
                  >
                  Ir a la cancha
                </Button>
              </div>

            </div>
          </>
        </InfoWindow>
      )}
    </div>
  )
}

