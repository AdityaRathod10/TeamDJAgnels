'use client';

import { useState } from 'react';
import { VendorRating, Review, PriceReport } from '@/types';
import {
  StarIcon,
  ExclamationCircleIcon,
  CheckBadgeIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/20/solid';

// Mock data for demonstration
const mockVendorRating: VendorRating = {
  vendorId: 'v1',
  overallRating: 4.2,
  totalReviews: 128,
  metrics: {
    quality: 4.5,
    pricing: 3.8,
    freshness: 4.3,
    cleanliness: 4.0,
    service: 4.4
  },
  recentReviews: [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Priya S.',
      rating: 4,
      metrics: {
        quality: 4,
        pricing: 3,
        freshness: 4,
        cleanliness: 4,
        service: 5
      },
      comment: 'Great quality vegetables, though slightly expensive. The vendor is very friendly and helpful.',
      purchaseVerified: true,
      helpful: 12,
      reported: 0,
      createdAt: '2025-01-28T10:30:00+05:30',
      updatedAt: '2025-01-28T10:30:00+05:30',
      reply: {
        vendorId: 'v1',
        comment: 'Thank you for your feedback! We source premium quality vegetables which affects our pricing.',
        createdAt: '2025-01-28T11:15:00+05:30'
      }
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Rahul M.',
      rating: 5,
      metrics: {
        quality: 5,
        pricing: 4,
        freshness: 5,
        cleanliness: 5,
        service: 5
      },
      comment: 'Best tomatoes in the area! Very fresh and reasonably priced.',
      purchaseVerified: true,
      helpful: 8,
      reported: 0,
      createdAt: '2025-01-27T16:45:00+05:30',
      updatedAt: '2025-01-27T16:45:00+05:30'
    }
  ],
  priceCompetitiveness: {
    status: 'moderate',
    comparisonScore: 65
  },
  qualityBadges: [
    {
      name: 'Premium Quality',
      earnedAt: '2024-12-15T00:00:00+05:30',
      description: 'Consistently high-quality produce'
    },
    {
      name: 'Customer Favorite',
      earnedAt: '2024-11-20T00:00:00+05:30',
      description: 'Highly rated by customers'
    }
  ],
  warningFlags: [
    {
      type: 'price_inflation',
      count: 2,
      lastReported: '2025-01-20T00:00:00+05:30'
    }
  ],
  visibilityScore: 85,
  improvementSuggestions: [
    'Consider adjusting prices to be more competitive',
    'Maintain consistent stock of popular items'
  ]
};

export default function VendorRatings() {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const getStarArray = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Vendor Ratings & Reviews</h1>
        
        {/* Overall Rating Section */}
        <div className="flex items-center mb-8">
          <div className="text-5xl font-bold text-gray-900 mr-4">
            {mockVendorRating.overallRating.toFixed(1)}
          </div>
          <div>
            <div className="flex mb-1">{getStarArray(mockVendorRating.overallRating)}</div>
            <p className="text-gray-700">{mockVendorRating.totalReviews} reviews</p>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(mockVendorRating.metrics).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 capitalize">{key}</h3>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-semibold text-gray-900 mr-2">{value.toFixed(1)}</span>
                <div className="flex">{getStarArray(value)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Recent Reviews</h2>
          {mockVendorRating.recentReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-900 mr-2">{review.userName}</span>
                    {review.purchaseVerified && (
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <CheckBadgeIcon className="h-4 w-4 mr-1" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex mb-2">{getStarArray(review.rating)}</div>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-800 mt-2 text-base">{review.comment}</p>
              
              {review.reply && (
                <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Vendor's Reply:</p>
                  <p className="text-gray-800">{review.reply.comment}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(review.reply.createdAt)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
