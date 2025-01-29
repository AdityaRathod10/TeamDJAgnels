'use client';

import { useState, useEffect } from 'react';
import { WishlistItem, Notification, VegetableItem, Vendor } from '@/types';

// Mock data (replace with API calls later)
const mockWishlistItems: (WishlistItem & { vegetable: VegetableItem; vendor: Vendor })[] = [
  {
    id: '1',
    userId: 'user1',
    vegetableId: 'veg1',
    vendorId: 'vendor1',
    targetPrice: 35,
    createdAt: '2025-01-29T10:36:14+05:30',
    notifyOnPriceDrop: true,
    vegetable: {
      id: 'veg1',
      name: 'Tomatoes',
      price: 40,
      unit: 'kg',
      quantity: 100,
      quality: 5,
      lastUpdated: '2025-01-29T10:36:14+05:30',
      priceHistory: [
        { price: 45, date: '2025-01-28T10:36:14+05:30' },
        { price: 40, date: '2025-01-29T10:36:14+05:30' },
      ]
    },
    vendor: {
      id: 'vendor1',
      name: 'Fresh Farms',
      marketName: 'Central Market',
      location: 'Downtown',
      rating: 4.5,
      distance: 1.2,
      vegetables: []
    }
  },
  // Add more mock items...
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleTargetPriceChange = (itemId: string, newPrice: number) => {
    setWishlistItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, targetPrice: newPrice }
          : item
      )
    );
  };

  const handleNotificationToggle = (itemId: string) => {
    setWishlistItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, notifyOnPriceDrop: !item.notifyOnPriceDrop }
          : item
      )
    );
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{item.vegetable.name}</h3>
                <p className="text-gray-600">{item.vendor.name} - {item.vendor.marketName}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-semibold">₹{item.vegetable.price}/{item.vegetable.unit}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-600">Target Price:</span>
                <input
                  type="number"
                  value={item.targetPrice}
                  onChange={(e) => handleTargetPriceChange(item.id, Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded-lg"
                  min="0"
                  step="0.5"
                />
                <span className="text-gray-600">₹/{item.vegetable.unit}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Notify on price drop</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.notifyOnPriceDrop}
                    onChange={() => handleNotificationToggle(item.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {item.vegetable.priceHistory && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Price History</h4>
                  <div className="space-y-1">
                    {item.vegetable.priceHistory.map((history, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {new Date(history.date).toLocaleDateString()}
                        </span>
                        <span>₹{history.price}/{item.vegetable.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Your wishlist is empty.</p>
          <a href="/search" className="text-green-600 hover:underline mt-2 inline-block">
            Browse vegetables
          </a>
        </div>
      )}
    </div>
  );
}
