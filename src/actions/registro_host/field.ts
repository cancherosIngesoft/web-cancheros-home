import { IFieldState } from "@/store/types";
import { fetchWithRetry } from "@/utils/utils";


const formatt_data = (data: IFieldState) => {
  const jsonData = {
    nombre: data.field_name,
    tipo: data.field_type,
    capacidad: data.field_capacity,
    descripcion: data.field_description,
    precio: data.field_price,
    field_schedule: data.field_schedule,
  };

  const formData = new FormData();

  // Corregir el manejo de base64
  data.field_images.forEach((base64String, index) => {
    try {
      // Asegurarse de que estamos trabajando con la parte correcta del base64
      const base64 = base64String.includes("base64,")
        ? base64String.split("base64,")[1]
        : base64String;

      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      formData.append("files", blob, `image-${index}.jpg`);
    } catch (error) {
      console.error("Error processing image:", error);
      throw new Error("Error al procesar las imágenes");
    }
  });

  formData.append("json", JSON.stringify(jsonData));
  return formData;
};

export async function registerField(fieldData: IFieldState, id: string) {
  try {
    const formattedData = formatt_data(fieldData);

    const response = await fetchWithRetry(
      process.env.NEXT_PUBLIC_API_URL + `/api/register_courts/${id}`,
      {
        method: "POST",
        body: formattedData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar la cancha");
    }

    return await response.json();
  } catch (error) {
    console.error("Register field error:", error);
    throw error;
  }
}

export async function updateField(fieldData: IFieldState, id: string) {
  try {
    console.log(fieldData);
    return true;
    /*
    const formattedData = formatt_data(fieldData);

    const response = await fetchWithRetry(
      process.env.NEXT_PUBLIC_API_URL + `/api/register_courts/${id}`,
      {
        method: "POST",
        body: formattedData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar la cancha");
    }

    return await response.json();
    */
  } catch (error) {
    console.error("Register field error:", error);
    throw error;
  }
}

export interface IField {
  capacidad: number;
  descripcion: string;
  establecimiento: {
    altitud: number;
    id_establecimiento: number;
    longitud: number;
  };
  id_cancha: number;
  id_establecimiento: number;
  imagen1: string | null;
  imagen2: string | null;
  imagen3: string | null;
  imagen4: string | null;
  imagen5: string | null;
  nombre: string;
  precio: number;
  tipo: string;
  field_schedule?: {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
  }[];
}

export interface IExistingField extends IField {
  field_schedule_?: {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
  }[];
}


export const getFieldsById = async (id: string):Promise<IExistingField[]> => {
  const response = await fetchWithRetry(
    process.env.NEXT_PUBLIC_API_URL + `/api/get_courts/${id}`,
    {
      method: "GET",
    }
  );

  const responseJson = await response.json();
  if (responseJson.error) {
    console.error("Error al obtener la cancha:", responseJson.error);
    return [];
  }
  return responseJson.courts.map((court: IExistingField) => ({
    ...court,
    field_schedule_: court.field_schedule?.map(schedule => ({
      dia: schedule.dia,
      hora_inicio: schedule.hora_inicio,
      hora_fin: schedule.hora_fin
    })),
  }));
};
