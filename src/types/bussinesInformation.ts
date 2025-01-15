export interface PersonalInfo {
    documentType: string
    documentNumber: string
    birthDate: string
    name: string
    lastName: string
    email: string
    phone: string
  }
  
  export interface BusinessInfo {
    name: string
    courtCount: number
    courtTypes: string[]
    phone: string
    legalDocuments: {
      name: string
      url: string
    }[]
  }
  
  export interface LocationInfo {
    locality: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  
  export interface RequestDetail {
    id: string
    personalInfo: PersonalInfo
    businessInfo: BusinessInfo
    locationInfo: LocationInfo
  }
  
  