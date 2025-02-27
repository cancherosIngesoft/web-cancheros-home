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
  //return [{hora_inicio:"10:00",hora_fin:"11:00"},{hora_inicio:"11:00",hora_fin:"12:00"}]
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/available/court/${id_field}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date.toISOString().split("T")[0] }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData.message);
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
  icon: string;
  description: string;
}
export async function getTeamsUser(id_user: string): Promise<teamReturn[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get_captain/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error al obtener el los Clubs del usuario");
    }

    const data = await res.json();
    const club = data.clubes;

    const teams: teamReturn[] = club.map((team: any) => {
      return {
        id: team.id_equipo,
        name: team.nombre,
        icon: team.imagen,
        description: team.descripcion,
      };
    });

    return teams;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Clubs:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

export interface Booking {
  hora_inicio: string;
  hora_fin: string;
  id_cancha: number;
  id_reservante: number;
  isTeam: boolean;
}

export interface BookingResponse {
  hora_fin: string;
  hora_inicio: string;
  id_reserva: number;
  partido: null;
  reservante: {
    id_reservante: number;
    tipo_reservante: string;
  };
}

export async function createBooking(
  booking: Booking
): Promise<BookingResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error || "Error al crear la reserva");
  }

  return data;
}

export async function initiatePayment(data: any, route: string): Promise<any> {
  const response = await fetch(`api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
  if (!response.ok) {
    throw new Error("Error al iniciar el pago");
  }
  return await response.json();
}

export interface PaymentFormData {
  nombres: string;
  apellidos: string;
  cedula: string;
  correo: string;
}

export interface ReservaDetails {
  fecha: string;
  horaInicio: string;
  horaFin: string;
  lugar: string;
  cancha: string;
  horas: number;
  total: number;
}

export async function handleBookingAndPayment(
  formData: PaymentFormData,
  reservaDetails: ReservaDetails,
  userId: number,
  isTeam: boolean,
  idTeam: string
) {
  // 1. Crear la reserva

  const dataBooking = {
    hora_inicio: `${
      new Date(reservaDetails.fecha).toISOString().split("T")[0]
    } ${reservaDetails.horaInicio}:00`,
    hora_fin: `${new Date(reservaDetails.fecha).toISOString().split("T")[0]} ${
      reservaDetails.horaFin
    }:00`,
    id_cancha: Number(reservaDetails.cancha),
    id_reservante: isTeam ? Number(idTeam) : userId,
    isTeam: isTeam,
  };
  const booking = await createBooking(dataBooking);
  if (typeof window !== "undefined") {
    localStorage.setItem("bookingId", booking.id_reserva.toString());
  }
  // 2. Iniciar el pago
  const paymentResult = await initiatePayment(
    {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      cedula: formData.cedula,
      correo: formData.correo,
      reservaDetails: {
        id: booking.id_reserva,
        lugar: reservaDetails.lugar,
        cancha: reservaDetails.cancha,
        horas: reservaDetails.horas,
        total: reservaDetails.total,
      },
    },
    "/payment_gateway"
  );

  return paymentResult;
}
