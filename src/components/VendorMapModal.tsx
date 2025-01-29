'use client';

import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import Modal from 'react-modal';
import { X, Navigation } from 'lucide-react';
import { Vendor } from '@/types/vendor';

// Mumbai coordinates as center
const center = {
  lat: 19.0760,
  lng: 72.8777
};

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface VendorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor?: Vendor;
}

export default function VendorMapModal({ isOpen, onClose, vendor }: VendorMapModalProps) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const vendorLocation = vendor?.location?.coordinates 
    ? { lat: vendor.location.coordinates[0], lng: vendor.location.coordinates[1] }
    : center;

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const getDirections = () => {
    if (!map || !vendor) return;

    const directionsService = new google.maps.DirectionsService();

    // Use browser's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          directionsService.route(
            {
              origin: origin,
              destination: vendorLocation,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        },
        () => {
          alert('Error: The Geolocation service failed.');
        }
      );
    } else {
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  };

  if (!vendor) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-11/12 max-w-4xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {vendor.profile?.shopname || 'Vendor Shop'} - {vendor.profile?.ownername || 'Owner'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={vendorLocation}
            zoom={15}
            onLoad={onMapLoad}
          >
            {/* Vendor Location Marker */}
            <Marker position={vendorLocation} />

            {/* Show directions if available */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: '#4CAF50',
                    strokeWeight: 4
                  }
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        <div className="mt-4 flex justify-end">
          <button
            onClick={getDirections}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </button>
        </div>
      </div>
    </Modal>
  );
}
