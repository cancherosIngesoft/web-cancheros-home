export interface bussinessInfo {
  id: string;
  name: string;
  geoReference: {
    lat: string;
    lon: string;
  };
  calification: number;
  priceRange: string[];
}

export async function getBussiness(): Promise<bussinessInfo[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/business`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las los negocios");
    }
    const data = await res.json();

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Bussines:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

export async function getBussinessFilters(
  location: string,
  fieldType: string,
  minPrice?: number,
  maxPrice?: number
): Promise<bussinessInfo[]> {
  try {
    // Construcción de la URL con los parámetros´
    let urlConstruct: {
      min_price?: string;
      max_price?: string;
      location?: string;
      field_type?: string;
    } = {};
    if (minPrice !== undefined) {
      urlConstruct["min_price"] = minPrice.toString();
    }
    if (maxPrice !== undefined) {
      urlConstruct["max_price"] = maxPrice.toString();
    }
    if (location !== "") {
      urlConstruct["location"] = location;
    }
    if (fieldType !== "") {
      urlConstruct["field_type"] = fieldType;
    }
    const queryParams = new URLSearchParams(urlConstruct).toString();

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
export interface Cancha {
  capacidad: number;
  descripcion: string;
  id_cancha: string;
  id_establecimiento: number;
  imagen1: string | null;
  imagen2: string | null;
  imagen3: string | null;
  imagen4: string | null;
  imagen5: string | null;
  nombre: string;
  precio: number;
  tipo: string;
}

export interface GeoReference {
  lat: string;
  lon: string;
}

export interface bussinessID {
  canchas: Cancha[];
  geoReference: GeoReference;
  id: number;
  name: string;
}

export async function getBussinessByID(id: string): Promise<bussinessID> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/business/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error al obtener el negocio");
    }
    return await res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Bussines:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}
export interface SchedulesToBook {
  hora_inicio: string;
  hora_fin: string;
}

export async function getAvailableHour(
  id_field: string,
  date: Date
): Promise<SchedulesToBook[]> {
  return [
    { hora_inicio: "10:00", hora_fin: "11:00" },
    { hora_inicio: "11:00", hora_fin: "12:00" },
  ];
  //CORREGIR ESTO
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/field/?field_id=${id_field}?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error al obtener el los horarios");
    }
    return await res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get schedules:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

interface teamReturn {
  id: string;
  name: string;
}
export async function getTeamsUser(id_user: string): Promise<teamReturn[]> {
  return [
    { id: "1", name: "Equipo 1" },
    { id: "2", name: "Equipo 2" },
  ];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/field`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Error al obtener el los horarios");
    }
    return await res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get schedules:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}
