import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vendor } from '@/types'; // Ensure this path is correct

// Dynamically import MapContainer and related components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(() => import('react-leaflet').then((mod) => mod.Polyline), {
  ssr: false,
});

interface VendorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
}

const VendorMapModal = ({ isOpen, onClose, vendor }: VendorMapModalProps) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error fetching user location:', error);
            setGeolocationError('Unable to fetch your location. Please enable location access.');
          }
        );
      } else {
        setGeolocationError('Geolocation is not supported by your browser.');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Custom marker icons
  const vendorIcon = L.icon({
    iconUrl: '../../public/vendor-location-pin.svg', // Ensure this file exists in the public folder
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const userIcon = L.icon({
    iconUrl: '../../public/user-location-pin.svg', // Ensure this file exists in the public folder
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">{vendor.name} Location</h2>
        {geolocationError && (
          <div className="text-red-600 mb-4">{geolocationError}</div>
        )}
        <div className="h-96 w-full">
          <MapContainer
            center={[vendor.coordinates.lat, vendor.coordinates.lng]}
            zoom={13}
            className="h-full w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Vendor Marker */}
            <Marker
              position={[vendor.coordinates.lat, vendor.coordinates.lng]}
              icon={vendorIcon}
            >
              <Popup>{vendor.name}</Popup>
            </Marker>
            {/* User Marker */}
            {userLocation && (
              <>
                <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={userIcon}
                >
                  <Popup>Your Location</Popup>
                </Marker>
                {/* Path between user and vendor */}
                <Polyline
                  positions={[
                    [userLocation.lat, userLocation.lng],
                    [vendor.coordinates.lat, vendor.coordinates.lng],
                  ]}
                  color="blue"
                />
              </>
            )}
          </MapContainer>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VendorMapModal;