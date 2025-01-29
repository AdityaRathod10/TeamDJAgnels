import { db } from "@/lib/firebase/firebase"
import { doc, setDoc } from "firebase/firestore"
import type { Vendor, VendorFormData } from "@/types/vendor"

export async function createVendor(formData: VendorFormData, uid: string): Promise<void> {
  try {
    // Create vendor document without uploading files
    const vendorData: Vendor = {
      location: {
        city: formData.city,
        coordinates: [0, 0], // You'll need to implement geocoding to get actual coordinates
      },
      profile: {
        contact: formData.phone,
        document: "", // This will be updated later when the file is uploaded
        email: formData.email,
        isverified: false,
        ownername: formData.ownerName,
        shopname: formData.shopName,
        shopphoto: "", // This will be updated later when the file is uploaded
      },
      ratings: {
        average: 0,
        distribution: [0, 0, 0, 0, 0], // Initialize empty ratings distribution
      },
      pendingUploads: {
        idDocument: true,
        shopPhoto: true,
      },
    }

    // Save to Firestore using the UID as the document ID
    await setDoc(doc(db, "vendors", uid), vendorData)
    console.log("Vendor created successfully")
  } catch (error) {
    console.error("Error creating vendor:", error)
    throw new Error("Failed to create vendor")
  }
}