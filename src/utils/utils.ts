import type { Reserva } from "@/components/hostBooking/model";

export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 1200;
        const maxHeight = 1200;
        const quality = 0.8;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64.split(",")[1]);
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
  });
};

export const formatCOP = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const parseCOP = (value: string) => {
  // Elimina cualquier caracter que no sea número
  return parseInt(value.replace(/\D/g, "")) || 0;
};

export function groupReservasByWeek(
  reservas: Reserva[]
): Record<string, Record<string, Reserva[]>> {
  const grouped: Record<string, Record<string, Reserva[]>> = {};

  reservas.forEach((reserva) => {
    const date = new Date(reserva.fecha);
    const weekStart = getWeekStart(date).toISOString().split("T")[0];
    const dateString = date.toISOString().split("T")[0];

    if (!grouped[weekStart]) {
      grouped[weekStart] = {};
    }
    if (!grouped[weekStart][dateString]) {
      grouped[weekStart][dateString] = [];
    }
    grouped[weekStart][dateString].push(reserva);
  });

  // Ordenar las semanas y los días dentro de cada semana
  const sortedGrouped: Record<string, Record<string, Reserva[]>> = {};
  Object.keys(grouped)
    .sort()
    .forEach((weekStart) => {
      sortedGrouped[weekStart] = {};
      Object.keys(grouped[weekStart])
        .sort()
        .forEach((date) => {
          sortedGrouped[weekStart][date] = grouped[weekStart][date];
        });
    });

  return sortedGrouped;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function getCanchasId(canchas: {
  courts: { id_cancha: string; precio: number }[];
}): { canchas_id: string; valor_hora: number }[] {
  return canchas.courts.map((cancha) => {
    return {
      canchas_id: cancha.id_cancha,
      valor_hora: cancha.precio,
    };
  });
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  params?: Record<string, string>,
  retries = 3,
  delay = 1000
): Promise<Response> {
  // Construir la URL con los parámetros solo una vez
  const initialUrl = params
    ? `${url}?${new URLSearchParams(params).toString()}`
    : url;

  async function attemptFetch(
    currentUrl: string,
    remainingRetries: number
  ): Promise<Response> {
    try {
      const response = await fetch(currentUrl, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (remainingRetries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return attemptFetch(currentUrl, remainingRetries - 1);
      }
      throw error;
    }
  }

  return attemptFetch(initialUrl, retries);
}

export const isReservationAvailable = (
  dateReservation: string,
  horaInicio: string
) => {
  let date = "";
  let time = "";

  if (horaInicio === "00:00") {
    date = dateReservation.split("T")[0];
    time = new Date(dateReservation)
      .toISOString()
      .split("T")[1]
      .substring(0, 5);
  } else {
    date = dateReservation.split("T")[0];
    time = new Date(horaInicio).toISOString().split("T")[1].substring(0, 5);
  }

  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");

  const reservationDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  const currentDate = new Date();
  const diffInMs = reservationDate.getTime() - currentDate.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  return diffInHours >= 24;
};
