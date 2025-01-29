import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { Vendor } from '@/types/vendor';

// Function to get all unverified vendors
export const getUnverifiedVendors = async (): Promise<Vendor[]> => {
  try {
    // Create a query to filter unverified vendors
    const vendorsQuery = query(
      collection(db, 'vendors'),
      where('verified', '==', false)
    );

    const querySnapshot = await getDocs(vendorsQuery);
    const vendors: Vendor[] = [];

    querySnapshot.forEach((doc) => {
      vendors.push({
        id: doc.id,
        ...doc.data() as Omit<Vendor, 'id'>
      });
    });

    return vendors;
  } catch (error) {
    console.error('Error fetching unverified vendors:', error);
    throw error;
  }
};

// Function to verify a vendor
export const verifyVendor = async (vendorId: string): Promise<void> => {
  try {
    const vendorRef = doc(db, 'vendors', vendorId);
    await updateDoc(vendorRef, {
      verified: true,
      verifiedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error verifying vendor:', error);
    throw error;
  }
};