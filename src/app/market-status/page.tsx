'use client';

import { useState, useEffect } from 'react';
import { VendorLocation, StreetCrowdInfo, StreetConditions } from '@/types';
import Link from 'next/link';

// Mock data for roadside vendors
const mockVendorData: VendorLocation = {
  vendorId: 'v1',
  name: 'Ramesh Vegetables',
  location: {
    address: 'Near City Hospital Gate',
    landmark: 'Opposite Bus Stop',
    coordinates: {
      lat: 19.0760,
      lng: 72.8777
    }
  },
  timings: {
    start: '07:00',
    end: '21:00'
  },
  isCurrentlyPresent: true,
  lastConfirmed: '2025-01-29T13:46:49+05:30'
};

const mockCrowdInfo: StreetCrowdInfo = {
  vendorId: 'v1',
  currentCustomers: 4,
  estimatedWaitTime: 5,
  status: 'normal',
  lastUpdated: '2025-01-29T13:46:49+05:30',
  usualPeakTimes: [
    { start: '08:00', end: '09:30', level: 'high' },
    { start: '12:30', end: '14:00', level: 'high' },
    { start: '18:00', end: '19:30', level: 'high' }
  ],
  nearbyParking: [
    {
      type: 'street',
      description: 'Street parking near bus stop',
      distance: 50,
      availability: 'available'
    },
    {
      type: 'informal',
      description: 'Open space next to shop',
      distance: 20,
      availability: 'limited'
    }
  ]
};

const mockStreetConditions: StreetConditions = {
  vendorId: 'v1',
  weather: {
    condition: 'sunny',
    temperature: 24,
    isIdeal: true
  },
  streetLighting: 'good',
  seating: {
    available: true,
    type: 'chairs',
    capacity: 6
  },
  shelter: {
    available: true,
    type: 'temporary',
    condition: 'good'
  },
  cleanliness: 'good',
  surroundings: {
    noise: 'moderate',
    traffic: 'moderate',
    safety: 'good'
  }
};

export default function VendorStatus() {
  const [vendor, setVendor] = useState<VendorLocation>(mockVendorData);
  const [crowdInfo, setCrowdInfo] = useState<StreetCrowdInfo>(mockCrowdInfo);
  const [conditions, setConditions] = useState<StreetConditions>(mockStreetConditions);

  const getStatusColor = (status: StreetCrowdInfo['status']) => {
    switch (status) {
      case 'quiet':
        return 'bg-green-100 text-green-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'very-busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusEmoji = (status: StreetCrowdInfo['status']) => {
    switch (status) {
      case 'quiet':
        return '😊';
      case 'normal':
        return '👍';
      case 'busy':
        return '⏳';
      case 'very-busy':
        return '🔥';
      default:
        return '❓';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Vendor Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{vendor.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm ${vendor.isCurrentlyPresent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {vendor.isCurrentlyPresent ? 'Currently Present' : 'Not Available'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-medium">{vendor.location.address}</p>
            <p className="text-sm text-gray-500">{vendor.location.landmark}</p>
          </div>
          <div>
            <p className="text-gray-600">Timings</p>
            <p className="font-medium">{vendor.timings.start} - {vendor.timings.end}</p>
            <p className="text-sm text-gray-500">Last confirmed: {new Date(vendor.lastConfirmed).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Current Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Crowd Level</p>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(crowdInfo.status)}`}>
                    {crowdInfo.status.charAt(0).toUpperCase() + crowdInfo.status.slice(1)}
                  </span>
                  <span className="ml-2 text-xl">{getStatusEmoji(crowdInfo.status)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Current Customers</p>
                <p className="text-xl font-semibold">{crowdInfo.currentCustomers}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600">Estimated Wait Time</p>
              <p className="text-xl font-semibold">{crowdInfo.estimatedWaitTime} minutes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Street Conditions</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Weather</p>
              <div className="flex items-center">
                <span className="text-xl font-semibold">{conditions.weather.temperature}°C</span>
                <span className="ml-2">{conditions.weather.condition === 'sunny' ? '☀️' : conditions.weather.condition === 'cloudy' ? '☁️' : '🌧️'}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600">Seating</p>
              <p className="font-medium">{conditions.seating.available ? `${conditions.seating.capacity} ${conditions.seating.type}` : 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">Shelter</p>
              <p className="font-medium">{conditions.shelter.type === 'none' ? 'No shelter' : `${conditions.shelter.type} (${conditions.shelter.condition})`}</p>
            </div>
            <div>
              <p className="text-gray-600">Safety</p>
              <p className="font-medium capitalize">{conditions.surroundings.safety}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Peak Times */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Usual Peak Times</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crowdInfo.usualPeakTimes.map((time, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{time.start} - {time.end}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  time.level === 'high' ? 'bg-red-100 text-red-800' :
                  time.level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {time.level}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {time.level === 'high' ? 'Very crowded' : time.level === 'moderate' ? 'Moderately busy' : 'Less crowded'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Parking */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Nearby Parking</h2>
        <div className="space-y-4">
          {crowdInfo.nearbyParking.map((parking, index) => (
            <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
              <div>
                <p className="font-medium">{parking.description}</p>
                <p className="text-sm text-gray-600">{parking.distance}m away</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                parking.availability === 'available' ? 'bg-green-100 text-green-800' :
                parking.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {parking.availability}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
