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
      description: 'Helped feed over 400 people'
    }
  ],
  impactRank: 12,
  sustainabilityScore: 85
};

export default function VendorSustainability({ params }: { params: { id: string } }) {
  const [unsoldItems, setUnsoldItems] = useState<UnsoldItem[]>(mockUnsoldItems);
  const [metrics, setMetrics] = useState<SustainabilityMetrics>(mockSustainabilityMetrics);
  const [showReportForm, setShowReportForm] = useState(false);

  const getStatusColor = (status: UnsoldItem['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      case 'collected':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: 'good' | 'fair' | 'overripe') => {
    switch (condition) {
      case 'good':
        return 'text-green-600';
      case 'fair':
        return 'text-yellow-600';
      case 'overripe':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sustainability Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sustainability Impact</h1>
            <p className="text-gray-600">Making a difference in our community</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Impact Rank</p>
            <p className="text-2xl font-bold text-green-600">#{metrics.impactRank}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <GlobeAsiaAustraliaIcon className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{metrics.totalStats.wastePreventedKg}kg</p>
            <p className="text-sm text-gray-600">Waste Prevented</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{metrics.totalStats.carbonSavedKg}kg</p>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <UsersIcon className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{metrics.totalStats.peopleHelped}</p>
            <p className="text-sm text-gray-600">People Helped</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrophyIcon className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{metrics.totalStats.donationsCount}</p>
            <p className="text-sm text-gray-600">Total Donations</p>
          </div>
        </div>

        {/* Badges */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-3">Sustainability Badges</h2>
          <div className="flex flex-wrap gap-3">
            {metrics.badges.map((badge, index) => (
              <div key={index} className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <TrophyIcon className="h-5 w-5 mr-1" />
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unsold Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Unsold Items</h2>
          <button
            onClick={() => setShowReportForm(true)}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Report Items
          </button>
        </div>

        <div className="space-y-6">
          {unsoldItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <div className="mt-2">
                    <div className="flex items-center text-gray-600 mb-1">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        Pickup: {new Date(item.pickupDetails.timeWindow.start).toLocaleTimeString()} - {new Date(item.pickupDetails.timeWindow.end).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{item.pickupDetails.location.address}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Potential Impact</p>
                  <p className="font-medium">{item.sustainability.potentialWasteSaved}kg waste prevented</p>
                  <p className="text-sm text-gray-600">{item.sustainability.peopleImpacted} people helped</p>
                </div>
              </div>

              <div className="space-y-2">
                {item.items.map((product, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-t">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center mt-1">
                        <span className={`text-sm ${getConditionColor(product.condition)}`}>
                          {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                        </span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-sm text-gray-600">
                          {product.quantity} {product.unit}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm line-through text-gray-400">₹{product.price.original}</p>
                      <p className="font-medium text-green-600">₹{product.price.discounted}</p>
                    </div>
                  </div>
                ))}
              </div>

              {item.status === 'available' && (
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
