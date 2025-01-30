import { db } from '@/lib/firebase/firebase';
import { collection, query, where, getDocs, GeoPoint } from 'firebase/firestore';
import { getDistance } from 'geolib';

interface ChatResponse {
  text: string;
  data?: any;
}

export async function processQuery(userQuery: string, userLocation?: { lat: number; lng: number }): Promise<ChatResponse> {
  const query_lower = userQuery.toLowerCase();

  // Vendor related queries
  if (query_lower.includes('vendors') || query_lower.includes('shops') || query_lower.includes('stores')) {
    if (query_lower.includes('radius') || query_lower.includes('km') || query_lower.includes('kilometer')) {
      if (!userLocation) {
        return {
          text: "I'll need your location to find nearby vendors. Please enable location services."
        };
      }
      
      // Extract radius from query (default to 5km)
      const radiusMatch = query_lower.match(/\d+(\.\d+)?/);
      const radius = radiusMatch ? parseFloat(radiusMatch[0]) : 5;
      
      try {
        const vendorsRef = collection(db, 'vendors');
        const vendorsSnapshot = await getDocs(vendorsRef);
        const nearbyVendors = [];

        for (const doc of vendorsSnapshot.docs) {
          const vendor = doc.data();
          const vendorLocation = vendor.location;
          
          if (vendorLocation) {
            const distance = getDistance(
              { latitude: userLocation.lat, longitude: userLocation.lng },
              { latitude: vendorLocation.latitude, longitude: vendorLocation.longitude }
            ) / 1000; // Convert to kilometers

            if (distance <= radius) {
              nearbyVendors.push({
                name: vendor.name,
                address: vendor.address,
                distance: Math.round(distance * 10) / 10
              });
            }
          }
        }

        nearbyVendors.sort((a, b) => a.distance - b.distance);

        return {
          text: `I found ${nearbyVendors.length} vendors within ${radius}km of your location:\n\n${
            nearbyVendors.map(v => `• ${v.name} (${v.distance}km away)\n  ${v.address}`).join('\n\n')
          }`,
          data: nearbyVendors
        };
      } catch (error) {
        console.error('Error fetching vendors:', error);
        return {
          text: "I'm having trouble fetching vendor information right now. Please try again later."
        };
      }
    }
  }

  // Price related queries
  if (query_lower.includes('price') || query_lower.includes('cost') || query_lower.includes('rate')) {
    const vegetables = ['tomato', 'potato', 'onion', 'carrot', 'spinach'];
    let matchedVeg = '';

    for (const veg of vegetables) {
      if (query_lower.includes(veg)) {
        matchedVeg = veg;
        break;
      }
    }

    if (matchedVeg) {
      try {
        const pricesRef = collection(db, 'prices');
        const q = query(pricesRef, where('vegetable', '==', matchedVeg));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const priceData = snapshot.docs[0].data();
          return {
            text: `Current market prices for ${matchedVeg}:\n• Average: ₹${priceData.average}/kg\n• Range: ₹${priceData.min} - ₹${priceData.max}/kg`,
            data: priceData
          };
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    }
  }

  // Delivery related queries
  if (query_lower.includes('delivery')) {
    if (query_lower.includes('time') || query_lower.includes('long')) {
      return {
        text: "Delivery times vary based on your location and the vendor:\n• Same day delivery for orders before 2 PM\n• Next day delivery for later orders\n• Typical delivery time: 2-4 hours"
      };
    }
    if (query_lower.includes('fee') || query_lower.includes('charge') || query_lower.includes('cost')) {
      return {
        text: "Delivery charges:\n• Free delivery for orders above ₹500\n• ₹40 for orders below ₹500\n• Additional distance charges may apply beyond 5km"
      };
    }
  }

  // Order related queries
  if (query_lower.includes('order')) {
    if (query_lower.includes('cancel')) {
      return {
        text: "To cancel an order:\n1. Go to My Orders\n2. Select the order you want to cancel\n3. Click the Cancel button\n\nNote: Orders can only be cancelled within 30 minutes of placing them."
      };
    }
    if (query_lower.includes('track')) {
      return {
        text: "To track your order:\n1. Go to My Orders\n2. Find your order in the list\n3. Click 'Track Order'\n\nYou'll see real-time updates of your order status."
      };
    }
  }

  // Payment related queries
  if (query_lower.includes('payment') || query_lower.includes('pay')) {
    return {
      text: "We accept various payment methods:\n• UPI (GPay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Cash on Delivery\n\nAll online transactions are secure and encrypted."
    };
  }

  // Default response for unhandled queries
  return {
    text: "I'm not sure about that. You can ask me about:\n• Nearby vendors\n• Vegetable prices\n• Delivery information\n• Order tracking\n• Payment methods"
  };
}
