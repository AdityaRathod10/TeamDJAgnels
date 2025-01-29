export interface VendorFormData {
  shopName: string
  ownerName: string
  phone: string
  password: string
  address: string
  city: string
  email: string
  idType: "aadhar" | "pan"
  idNumber: string
  idDocument: File | null
  shopPhoto: File | null
}

export interface Vendor {
  location: {
    city: string
    coordinates: [number, number]
  }
  profile: {
    contact: string
    document: string
    email: string
    isverified: boolean
    ownername: string
    shopname: string
    shopphoto: string
  }
  ratings: {
    average: number
    distribution: number[]
  }
  pendingUploads?: {
    idDocument: boolean
    shopPhoto: boolean
  }
}