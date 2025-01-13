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
  

export async function fetchRequestsOwnersPending(): Promise<RequestsOwners[]> {
  // Simulando una llamada a la API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Por ahora retornamos datos mock
  // En producción, aquí iría el fetch real a tu API
  return mockRequests
  
  
}
export async function fetchRequestsOwnersRejected(): Promise<RequestsOwners[] > {
    // Simulando una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Por ahora retornamos datos mock
    // En producción, aquí iría el fetch real a tu API
    return mockRequestsRejected
    
  }
  

  import { RequestDetail } from "../types/bussinesInformation"

  // Simulated API calls
  export async function fetchRequestDetails(id: string): Promise<RequestDetail> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      id,
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
  }
  
  export async function approveRequest(id: string): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
  }
  
  export async function rejectRequest(id: string): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
  }
  