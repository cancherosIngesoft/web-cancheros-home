export const mockRequests: RequestsOwners[] = [
  {
    id: "1",
    name: "Juan Alberto espitia",
    email: "juan@gmail.com",
    phone: "300 721 1345",
    businessName: "La futbolera",
    address: "Calle 77b #123-A"
  },
  {
    id: "2",
    name: "Armando Quintas",
    email: "aquintas@gmail.com",
    phone: "310 721 1245",
    businessName: "La futbolera",
    address: "Diagonal 27 A"
  },
  {
    id: "3",
    name: "Armando Bulla",
    email: "bulla@gmail.com",
    phone: "300 711 1245",
    businessName: "La futbolera",
    address: "Calle 12 #13-A"
  }
]

export const mockRequestsRejected: RequestsOwners[] = [
  {
    id: "1",
    name: "Juan Alberto espitia",
    email: "juan@gmail.com",
    phone: "300 721 1345",
    businessName: "La futbolera",
    address: "Calle 77b #123-A"
  },

]

export interface RequestsOwners {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  address: string
}


export interface RequestsOwners {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  address: string; // Este campo no está en la respuesta, le asignaremos un valor por defecto
}

export async function fetchRequestsOwnersPending(): Promise<RequestsOwners[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests?status=pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las solicitudes");
    }

    const data = await res.json();


    const formattedData: RequestsOwners[] = data.map((item: any) => ({
      id: String(item.id),
      name: item.personalInfo?.nombre_duenio || "Desconocido",
      email: item.personalInfo?.email_duenio || "No especificado",
      phone: item.personalInfo?.tel_duenio || "No especificado",
      businessName: item.businessInfo?.nombre_est || "Sin nombre comercial",
      address: item.locationInfo?.direccion, // Valor por defecto, ya que no está en la respuesta
    }));

    return formattedData;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en fetchRequestsOwnersPending:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

export async function fetchRequestsOwnersRejected(): Promise<RequestsOwners[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests?status=rejected`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "mode": "no-cors"
        
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las solicitudes");
    }

    const data = await res.json();


    const formattedData: RequestsOwners[] = data.map((item: any) => ({
      id: String(item.id),
      name: item.personalInfo?.nombre_duenio || "Desconocido",
      email: item.personalInfo?.email_duenio || "No especificado",
      phone: item.personalInfo?.tel_duenio || "No especificado",
      businessName: item.businessInfo?.nombre_est || "Sin nombre comercial",
      address: item.locationInfo?.direccion, // Valor por defecto, ya que no está en la respuesta
    }));

    return formattedData;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en fetchRequestsOwnersRejected:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}




import { RequestDetail } from "../types/bussinesInformation"

const mockRequestDetail: RequestDetail = {
  id: "1",
  personalInfo: {
    documentType: "C.C",
    documentNumber: "10092381821",
    birthDate: "12/09/1992",
    name: "Juan Alberto",
    lastName: "Espitia Granados",
    email: "juan@gmail.com",
    phone: "(+57) 300 721 1235"
  },
  businessInfo: {
    name: "La futbolera",
    courtCount: 10,
    courtTypes: ["Fútbol 5", "Fútbol 7", "Fútbol 11"],
    phone: "(+601) 735 8181",
    legalDocuments: [
      {
        name: "RUT_FUTBOLERA_DIAN20103123.pdf",
        url: "#"
      }
    ]
  },
  locationInfo: {
    locality: "Suba",
    address: "Calle 77b #123-A",
    coordinates: {
      lat: 4.6097,
      lng: -74.0817
    }
  }
}
// Simulated API calls
export async function fetchRequestDetails(id: string): Promise<RequestDetail> {
  console.log("se pidio la informacion de la solicitud detalles", id);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener el detalle de la solicitud");
    }

    const data = await res.json();

    // Mapeo de la respuesta a la interfaz RequestDetail
    const requestDetail: RequestDetail = {
      id: String(data.id), // Asegúrate de convertir el id a string si es necesario
      personalInfo: {
        documentType: data.personalInfo.tipo_doc_duenio,
        documentNumber: data.personalInfo.doc_duenio,
        birthDate: data.personalInfo.fecha_nacimiento,
        name: data.personalInfo.nombre_duenio.split(' ')[0], // Nombre
        lastName: data.personalInfo.apellido_duenio, // Apellido
        email: data.personalInfo.email_duenio,
        phone: data.personalInfo.tel_duenio,
      },
      businessInfo: {
        name: data.businessInfo.nombre_est,
        courtCount: data.businessInfo.num_canchas,
        courtTypes: data.businessInfo.type_canchas,
        phone: data.businessInfo.tel_est,
        legalDocuments: [
          {
            name: data.businessInfo.legalDocuments.name,
            url: data.businessInfo.legalDocuments.url || "", // Asignar un valor por defecto si es null
          },
        ],
      },
      locationInfo: {
        locality: data.locationInfo.localidad,
        address: data.locationInfo.direccion,
        coordinates: {
          lat: parseFloat(data.locationInfo.coordinates.latitud), // Asegúrate de convertir las coordenadas a números
          lng: parseFloat(data.locationInfo.coordinates.longitud),
        },
      },
    };

    return requestDetail;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en fetchRequestsOwnersDetails:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}


export async function approveRequest(id: string): Promise<{ success: boolean }> {
  console.log("se aprobo la solicitud", id)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/${id}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Error al apobar la solicitud");
    }

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en Approve request:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
  
}

export async function rejectRequest(id: string, reason: string): Promise<{ success: boolean }> {
  console.log("se rechazo la solicitud", id, reason)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ reason }),
    });

    if (!res.ok) {
      throw new Error("Error al rechazar la solicitud");
    }

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en reject request:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
  
}
