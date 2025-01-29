'use client';

import { useState, useEffect } from 'react';
import { Vendor, VegetableItem } from '@/types';

// Mock data (replace with API calls later)
const mockVegetables = [
  'Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Cabbage', 
  'Spinach', 'Cucumber', 'Bell Peppers', 'Cauliflower', 'Broccoli'
];

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Fresh Farms',
    marketName: 'Central Market',
    location: 'Downtown',
    rating: 4.5,
    distance: 1.2,
    vegetables: [
      {
        id: '1',
        name: 'Tomatoes',
        price: 40,
        unit: 'kg',
        quantity: 100,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30'
      }
    ]
  },
  // Add more mock vendors...
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVegetable, setSelectedVegetable] = useState('');
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('distance');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);

  useEffect(() => {
    // Filter and sort vendors based on criteria
    let results = mockVendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.marketName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVegetable = !selectedVegetable || 
        vendor.vegetables.some(v => v.name.toLowerCase() === selectedVegetable.toLowerCase());
      const matchesDistance = vendor.distance <= maxDistance;
      const matchesRating = vendor.rating >= minRating;

      return matchesSearch && matchesVegetable && matchesDistance && matchesRating;
    });

    // Sort results
    results.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    setFilteredVendors(results);
  }, [searchQuery, selectedVegetable, maxDistance, minRating, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Vegetables & Vendors</h1>
        
        {/* Main Search */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search vendors or markets..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedVegetable}
            onChange={(e) => setSelectedVegetable(e.target.value)}
          >
            <option value="">All Vegetables</option>
            {mockVegetables.map(veg => (
              <option key={veg} value={veg}>{veg}</option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Distance ({maxDistance}km)
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating ({minRating}★)
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{vendor.name}</h3>
                <p className="text-gray-600">{vendor.marketName}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                {vendor.distance}km
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">{'★'.repeat(Math.floor(vendor.rating))}</span>
                <span className="text-gray-300">{'★'.repeat(5 - Math.floor(vendor.rating))}</span>
                <span className="ml-2 text-sm text-gray-600">{vendor.rating}</span>
              </div>
              <p className="text-sm text-gray-500">{vendor.location}</p>
            </div>

            {vendor.vegetables.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Available Vegetables:</h4>
                <div className="space-y-2">
                  {vendor.vegetables.map(veg => (
                    <div key={veg.id} className="flex justify-between items-center text-sm">
                      <span>{veg.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">₹{veg.price}/{veg.unit}</span>
                        <button
                          onClick={() => {
                            // Add to wishlist logic here
                            alert('Added to wishlist!');
                          }}
                          className="text-green-600 hover:text-green-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No vendors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
