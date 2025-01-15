import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    // Validación de dirección
    if (!address) {
      console.log("No address provided");
      return NextResponse.json(
        { error: "La dirección es requerida" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;

    // Validación de API key
    if (!API_KEY) {
      console.log("No API key configured");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    console.log("Fetching geocode for address:", address);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );

    const data = await response.json();
    console.log("Google Maps API response:", data);

    if (data.status === "OK" && data.results && data.results[0]) {
      const { lat, lng } = data.results[0].geometry.location;
      return NextResponse.json({ latitude: lat, longitude: lng });
    }

    return NextResponse.json(
      { error: `No se pudo obtener la ubicación: ${data.status}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
