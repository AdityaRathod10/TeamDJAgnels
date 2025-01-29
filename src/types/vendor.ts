export interface Vendor {
  shopName: string;
  ownerName: string;
  phone: string;
  address: string;
  idType: "aadhar" | "pan";
  idNumber: string;
  idDocumentUrl?: string;
  shopPhotoUrl?: string;
  verified: boolean;
  password: string;
  idDocument: File | null;
  shopPhoto: File | null;// src/types/vendor.ts
  export interface Vendor {
      id?: string;
      shopName: string;
      ownerName: string;
      phone: string;
      password: string;
      address: string;
      idType: 'aadhar' | 'pan';
      idNumber: string;
      idDocument: File | null;
      shopPhoto: File | null;
      vendorPhoto: File | null;
      status?: VendorStatus;
      createdAt?: string;
      idDocumentUrl?: string;
      shopPhotoUrl?: string;
      vendorPhotoUrl?: string;
      verified: boolean; 
    }
    
    export type VendorStatus = 
      | 'pending_verification'
      | 'verified'
      | 'rejected'
      | 'suspended';
    
    export interface VendorLoginData {
      phone: string;
      password: string;
    }
    
    export interface VendorRegistrationData {
      shopName: string;
      ownerName: string;
      phone: string;
      password: string;
      address: string;
      idType: 'aadhar' | 'pan';
      idNumber: string;
      idDocument: File | null;
      shopPhoto: File | null;
      vendorPhoto: File | null;
    }
    
    export interface FileUploadResponse {
      url: string;
      path: string;
    }
  vendorPhoto: File | null;
}
