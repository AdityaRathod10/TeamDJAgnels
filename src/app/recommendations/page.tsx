'use client';

import { useState, useEffect } from 'react';
import { SeasonalVegetable, VegetableRecommendation } from '@/types';

// Mock seasonal vegetables data
const mockSeasonalVegetables: SeasonalVegetable[] = [
  {
    id: '1',
    name: 'Spinach',
    season: {
      start: '01-01',
      end: '12-31'
    },
    peak: {
      start: '11-01',
      end: '02-28'
    },
    nutritionalInfo: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
      vitamins: ['A', 'C', 'K', 'B6'],
      minerals: ['Iron', 'Calcium', 'Magnesium']
    },
    healthBenefits: [
      'Boosts immunity',
      'Improves eye health',
      'Supports bone health'
    ],
    storageLife: 7,
    cookingTips: [
      'Steam lightly to preserve nutrients',
      'Add to smoothies for extra nutrition'
    ],
    substitutes: ['Kale', 'Swiss Chard']
  },
  // Add more seasonal vegetables...
];

// Mock recommendations
const mockRecommendations: VegetableRecommendation[] = [
  {
    vegetableId: '1',
    score: 95,
    reasons: [
      'In peak season',
      'Matches your health preferences',
      'High in iron - good for anemia',
      'Within your budget range'
    ],
    seasonality: 'peak-season',
    priceRange: {
      min: 30,
      max: 45
    },
    nutritionalMatch: 90,
    vendors: [
      {
        id: 'v1',
        name: 'Fresh Farms',
        price: 35,
        distance: 1.2
      },
      {
        id: 'v2',
        name: 'Green Market',
        price: 38,
        distance: 2.1
      }
    ]
  },
  // Add more recommendations...
];

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<VegetableRecommendation[]>(mockRecommendations);
  const [filter, setFilter] = useState<'all' | 'in-season' | 'peak-season'>('all');

  const filteredRecommendations = recommendations.filter(rec =>
    filter === 'all' || rec.seasonality === filter
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Personalized Recommendations</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Vegetables</option>
          <option value="in-season">In Season</option>
          <option value="peak-season">Peak Season</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredRecommendations.map(recommendation => {
          const vegetable = mockSeasonalVegetables.find(v => v.id === recommendation.vegetableId);
          if (!vegetable) return null;

          return (
            <div key={recommendation.vegetableId} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{vegetable.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      recommendation.seasonality === 'peak-season'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {recommendation.seasonality === 'peak-season' ? 'Peak Season' : 'In Season'}
                    </span>
                    <span className="text-sm text-gray-600">
                      Match Score: {recommendation.score}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Price Range</span>
                  <p className="font-medium">₹{recommendation.priceRange.min} - ₹{recommendation.priceRange.max}</p>
                </div>
              </div>

              {/* Reasons for recommendation */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Why we recommend this:</h3>
                <ul className="space-y-1">
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nutritional Information */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Nutritional Highlights:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Calories:</span>
                    <span className="ml-2">{vegetable.nutritionalInfo.calories}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Protein:</span>
                    <span className="ml-2">{vegetable.nutritionalInfo.protein}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fiber:</span>
                    <span className="ml-2">{vegetable.nutritionalInfo.fiber}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Key Vitamins:</span>
                    <span className="ml-2">{vegetable.nutritionalInfo.vitamins.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Available Vendors */}
              <div>
                <h3 className="font-medium mb-2">Where to Buy:</h3>
                <div className="space-y-2">
                  {recommendation.vendors.map(vendor => (
                    <div key={vendor.id} className="flex justify-between items-center text-sm">
                      <span>{vendor.name}</span>
                      <div className="flex items-center gap-4">
                        <span>₹{vendor.price}</span>
                        <span className="text-gray-600">{vendor.distance}km</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Tips */}
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Quick Tips:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {vegetable.cookingTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No recommendations found</p>
        </div>
      )}
    </div>
  );
}
