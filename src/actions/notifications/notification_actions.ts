import { fetchWithRetry } from "@/utils/utils";

export interface Notification {
  id_noti_stats: number;
  partido: {
    equipo: {
      descripcion: string;
      id_capitan: number;
      id_equipo: number;
      imagen: string;
      nombre: string;
    };
  };
  id_reserva: number;
}

export interface Calification {
  id_establecimiento: number;
  id_user: number;
}

export async function getNotifications(userId: string) {
  try {
    const notifications = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/stats/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await notifications.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }

  /*
  return [
    {
      id_noti_stats: 7,
      partido: {
        equipo: {
          descripcion: "descripcion de prueba 1.",
          id_capitan: 87,
          id_equipo: 91,
          imagen:
            "https://storage.googleapis.com/cancheros_bucket/clubes/empty.jpg",
          nombre: "nombre de prueba 1.",
        },
      },
      id_reserva: 13,
    },
    {
      id_noti_stats: 10,
      partido: {
        equipo: {
          descripcion: "descripcion de prueba 2.",
          id_capitan: 87,
          id_equipo: 91,
          imagen:
            "https://storage.googleapis.com/cancheros_bucket/clubes/empty.jpg",
          nombre: "nombre de prueba 2.",
        },
      },
      id_reserva: 14,
    },
    {
      id_noti_stats: 11,
      partido: {
        equipo: {
          descripcion: "descripcion de prueba 3.",
          id_capitan: 87,
          id_equipo: 91,
          imagen:
            "https://storage.googleapis.com/cancheros_bucket/clubes/empty.jpg",
          nombre: "nombre de prueba 3.",
        },
      },
      id_reserva: 15,
    },
  ];
  */
}

export async function getCalifications(userId: string) {
  try {
    const califications = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/califications/pending/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await califications.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }

  /*
  return [
    {
      id_establecimiento: 13,
      id_user: 87,
    },
    {
      id_establecimiento: 14,
      id_user: 87,
    },
    {
      id_establecimiento: 15,
      id_user: 87,
    },
    {
      id_establecimiento: 16,
      id_user: 87,
    },
    {
      id_establecimiento: 17,
      id_user: 87,
    },
    {
      id_establecimiento: 18,
      id_user: 87,
    },
  ];
  */
}

export async function setMarcador(id_reserva: number, marcador: number[]) {
  try {
    const response = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/partido/add_marcador`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_reserva, marcador }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function setCalification(
  id_establecimiento: number,
  descripcion: string,
  calificacion: number
) {
  try {
    const response = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/califications/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_establecimiento, descripcion, calificacion }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
