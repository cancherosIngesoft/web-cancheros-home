export interface bussinessInfo {
  id: string
  name: string
  geoReference: {
    lat: string
    lon: string
  }
  calification: number
  priceRange: string[]
}



export async function getBussiness(

): Promise<bussinessInfo[]> {

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/business`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )


    if (!res.ok) {
      throw new Error("Error al obtener las los negocios")

    }
    const data = await res.json()


    return data
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Bussines:", e.message)
      throw new Error(e.message)
    } else {
      throw new Error("Error desconocido")
    }

  }


}


export async function getBussinessFilters(
  location: string,
  fieldType: string,
  minPrice: number,
  maxPrice: number
): Promise<bussinessInfo[]> {
  try {
    // Construcción de la URL con los parámetros
    const queryParams = new URLSearchParams({
      location,
      field_type: fieldType,
      min_price: minPrice.toString(),
      max_price: maxPrice.toString(),
    }).toString();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/business?${queryParams}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al buscar los negocios");
    }

    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en getBusinessFilters:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}
