import { Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { Button } from "../ui/button";

type MapMarkerProps = {
  marker: {
    lat: number;
    lng: number;
    text?: string;
  };
  index: number;
  selectedMarker: number | null;
  setSelectedMarker: (index: number | null) => void;
};

export function MapMarker({
  marker,
  index,
  selectedMarker,
  setSelectedMarker,
}: MapMarkerProps) {
  return (
    <div key={index}>
      <Marker
        position={marker}
        icon={"/green_pin.svg"}
        onClick={() => setSelectedMarker(index)}
      />
      {selectedMarker === index && (
        <InfoWindow
          position={marker}
          onCloseClick={() => setSelectedMarker(null)}
          className="w-40 text-center text-sm h-20"
        >
          <div>
            <p>{marker.text || `Marker ${index + 1}`}</p>
            <Button onClick={() => setSelectedMarker(null)}>Cerrar</Button>
          </div>
        </InfoWindow>
      )}
    </div>
  );
}
