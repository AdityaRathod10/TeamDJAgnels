'use client';

import { useState } from 'react';
import { UnsoldItem, SustainabilityMetrics } from '@/types';
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  GlobeAsiaAustraliaIcon,
  UsersIcon,
  TrophyIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/20/solid';

// Mock data for demonstration
const mockUnsoldItems: UnsoldItem[] = [
  {
    id: 'u1',
    vendorId: 'v1',
    items: [
      {
        name: 'Tomatoes',
        quantity: 5,
        unit: 'kg',
        condition: 'good',
        bestBeforeTime: '2025-01-30T18:00:00+05:30',
        price: {
          original: 60,
          discounted: 30
        }
      },
      {
        name: 'Spinach',
        quantity: 2,
        unit: 'kg',
        condition: 'fair',
        bestBeforeTime: '2025-01-30T12:00:00+05:30',
        price: {
          original: 40,
          discounted: 20
        }
      }
    ],
    status: 'available',
    pickupDetails: {
      location: {
        address: 'Near City Hospital Gate',
        landmark: 'Opposite Bus Stop',
        coordinates: {
          lat: 19.0760,
          lng: 72.8777
        }
      },
      timeWindow: {
        start: '2025-01-29T18:00:00+05:30',
        end: '2025-01-29T20:00:00+05:30'
      },
      instructions: 'Please bring your own bags'
    },
    sustainability: {
      potentialWasteSaved: 7,
      carbonFootprint: 3.5,
      peopleImpacted: 14
    },
    createdAt: '2025-01-29T14:02:15+05:30',
    updatedAt: '2025-01-29T14:02:15+05:30'
  }
];

const mockSustainabilityMetrics: SustainabilityMetrics = {
  vendorId: 'v1',
  totalStats: {
    wastePreventedKg: 245,
    carbonSavedKg: 122.5,
    peopleHelped: 490,
    donationsCount: 35
  },
  monthlyStats: [
    {
      month: '2025-01',
      wastePreventedKg: 45,
      carbonSavedKg: 22.5,
      peopleHelped: 90,
      donationsCount: 8
    },
    {
      month: '2024-12',
      wastePreventedKg: 52,
      carbonSavedKg: 26,
      peopleHelped: 104,
      donationsCount: 7
    }
  ],
  badges: [
    {
      name: 'Zero Waste Champion',
      earnedAt: '2024-12-15T00:00:00+05:30',
      description: 'Prevented over 200kg of food waste'
    },
    {
      name: 'Community Hero',
      earnedAt: '2024-11-20T00:00:00+05:30',
      description: 'Helped over 400 people through donations'
    }
  ]
};

export default function VendorSustainability() {
  const [selectedMonth, setSelectedMonth] = useState<string>('2025-01');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Sustainability Impact</h1>

        {/* Total Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <GlobeAsiaAustraliaIcon className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-medium text-gray-900">Waste Prevented</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {mockSustainabilityMetrics.totalStats.wastePreventedKg} kg
            </p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-medium text-gray-900">Carbon Saved</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {mockSustainabilityMetrics.totalStats.carbonSavedKg} kg
            </p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <UsersIcon className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="font-medium text-gray-900">People Helped</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {mockSustainabilityMetrics.totalStats.peopleHelped}
            </p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <TrophyIcon className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="font-medium text-gray-900">Total Donations</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {mockSustainabilityMetrics.totalStats.donationsCount}
            </p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Achievement Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSustainabilityMetrics.badges.map((badge) => (
              <div key={badge.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrophyIcon className="h-6 w-6 text-yellow-400 mr-2" />
                  <h3 className="font-medium text-gray-900">{badge.name}</h3>
                </div>
                <p className="text-gray-800 text-sm mb-2">{badge.description}</p>
                <p className="text-sm text-gray-600">
                  Earned on {formatDate(badge.earnedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Unsold Items Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Available for Donation</h2>
          <div className="space-y-4">
            {mockUnsoldItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Items Available</h3>
                    <ul className="space-y-2">
                      {item.items.map((product, index) => (
                        <li key={index} className="flex justify-between text-gray-800">
                          <span>{product.name} ({product.quantity} {product.unit})</span>
                          <span className="text-green-600 font-medium">
                            ₹{product.price.discounted} <span className="text-gray-500 text-sm">(was ₹{product.price.original})</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Pickup Details</h3>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-800">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {item.pickupDetails.location.address}
                      </p>
                      <p className="flex items-center text-gray-800">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {formatTime(item.pickupDetails.timeWindow.start)} - {formatTime(item.pickupDetails.timeWindow.end)}
                      </p>
                      <p className="flex items-center text-gray-800">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {formatDate(item.pickupDetails.timeWindow.start)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
