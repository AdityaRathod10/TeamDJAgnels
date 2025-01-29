'use client';

import { useState } from 'react';

export default function Markets() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for markets (will be replaced with real data later)
  const markets = [
    {
      id: 1,
      name: "Central Vegetable Market",
      location: "Downtown Area",
      vendorCount: 25,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Fresh Harvest Market",
      location: "East Side",
      vendorCount: 15,
      rating: 4.2,
    },
    // Add more mock markets
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Local Markets</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search markets..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Markets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <div key={market.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{market.name}</h3>
            <p className="text-gray-600 mb-4">{market.location}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{market.vendorCount} vendors</span>
              <span>⭐ {market.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
