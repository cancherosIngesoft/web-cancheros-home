"use client";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
console.log("Api key is (maps): ", API_KEY);
console.log("geocoding api key is: ", process.env.GOOGLE_GEOCODING_API_KEY);
const BOGOTA_COORDS = { lat: 4.60971, lng: -74.08175 };

export default function CustomMap({
  center = BOGOTA_COORDS,
  zoom = 12,
  style = { width: "50vw", height: "50vh" },
}: {
  center?: { lat: number; lng: number };
  zoom?: number;
  style?: { width: string; height: string };
}) {
  const [currentCenter, setCurrentCenter] = useState(center);

  useEffect(() => {
    setCurrentCenter(center);
  }, [center]);

  return (
    <APIProvider apiKey={API_KEY as string}>
      <Map
        style={style}
        center={currentCenter}
        defaultZoom={zoom}
        gestureHandling={"none"}
        disableDefaultUI={true}
        zoomControl={true}
        streetViewControl={true}
      >
        <Marker position={currentCenter} icon={"/pin.png"} />
      </Map>
    </APIProvider>
  );
}
