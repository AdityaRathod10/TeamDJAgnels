'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Star, TrendingUp, TrendingDown, Activity, X, Plus } from 'lucide-react';

interface Vegetable {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceChange: number;
  rating: number;
  category: string;
  nutritionalValue: string;
  seasonality: string;
  stockLevel: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Mock data
const mockRecommendations: Vegetable[] = [
  {
    id: '1',
    name: 'Fresh Spinach',
    imageUrl: '/vegetables/spinach.jpg',
    price: 40,
    priceChange: -5,
    rating: 4.8,
    category: 'Leafy Greens',
    nutritionalValue: 'High in Iron, Vitamin K',
    seasonality: 'Year-round',
    stockLevel: 85
  },
  {
    id: '2',
    name: 'Organic Tomatoes',
    imageUrl: '/vegetables/tomatoes.jpg',
    price: 60,
    priceChange: 2,
    rating: 4.5,
    category: 'Fruits',
    nutritionalValue: 'Rich in Vitamin C, Lycopene',
    seasonality: 'Summer',
    stockLevel: 75
  },
  {
    id: '3',
    name: 'Baby Carrots',
    imageUrl: '/vegetables/carrots.jpg',
    price: 45,
    priceChange: 0,
    rating: 4.6,
    category: 'Root Vegetables',
    nutritionalValue: 'High in Vitamin A, Beta Carotene',
    seasonality: 'Winter',
    stockLevel: 90
  }
];

const mockWishlist: Vegetable[] = [
  {
    id: '4',
    name: 'Bell Peppers',
    imageUrl: '/vegetables/bellpeppers.jpg',
    price: 80,
    priceChange: -3,
    rating: 4.7,
    category: 'Capsicum',
    nutritionalValue: 'High in Vitamin C, Antioxidants',
    seasonality: 'Summer',
    stockLevel: 65
  },
  {
    id: '5',
    name: 'Broccoli',
    imageUrl: '/vegetables/broccoli.jpg',
    price: 90,
    priceChange: 4,
    rating: 4.4,
    category: 'Cruciferous',
    nutritionalValue: 'Rich in Fiber, Vitamin K',
    seasonality: 'Winter',
    stockLevel: 70
  }
];

export default function MyVegetablesPage() {
  const [recommendations, setRecommendations] = useState<Vegetable[]>(mockRecommendations);
  const [wishlist, setWishlist] = useState<Vegetable[]>(mockWishlist);
  const [selectedTab, setSelectedTab] = useState<'all' | 'recommendations' | 'wishlist'>('all');

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const addToWishlist = (vegetable: Vegetable) => {
    if (!wishlist.find(item => item.id === vegetable.id)) {
      setWishlist([...wishlist, vegetable]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Vegetables</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'all' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedTab('recommendations')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'recommendations' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              Recommendations
            </button>
            <button
              onClick={() => setSelectedTab('wishlist')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'wishlist' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              Wishlist
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Recommendations Section */}
          {(selectedTab === 'all' || selectedTab === 'recommendations') && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-500" />
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((vegetable) => (
                  <motion.div
                    key={vegetable.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative h-48">
                      <img
                        src={vegetable.imageUrl}
                        alt={vegetable.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{vegetable.rating}</span>
                        </div>
                        <button
                          onClick={() => addToWishlist(vegetable)}
                          className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{vegetable.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-green-600 font-medium">₹{vegetable.price}/kg</div>
                        <div className={`flex items-center gap-1 ${
                          vegetable.priceChange > 0 ? 'text-red-500' : vegetable.priceChange < 0 ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {vegetable.priceChange > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : vegetable.priceChange < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <Activity className="w-4 h-4" />
                          )}
                          <span>{Math.abs(vegetable.priceChange)}%</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Category: {vegetable.category}</div>
                        <div>Nutrition: {vegetable.nutritionalValue}</div>
                        <div>Season: {vegetable.seasonality}</div>
                        <div className="mt-4">
                          <div className="text-sm text-gray-500 mb-1">Stock Level</div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${vegetable.stockLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Wishlist Section */}
          {(selectedTab === 'all' || selectedTab === 'wishlist') && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                My Wishlist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((vegetable) => (
                  <motion.div
                    key={vegetable.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative h-48">
                      <img
                        src={vegetable.imageUrl}
                        alt={vegetable.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{vegetable.rating}</span>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(vegetable.id)}
                          className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{vegetable.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-green-600 font-medium">₹{vegetable.price}/kg</div>
                        <div className={`flex items-center gap-1 ${
                          vegetable.priceChange > 0 ? 'text-red-500' : vegetable.priceChange < 0 ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {vegetable.priceChange > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : vegetable.priceChange < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <Activity className="w-4 h-4" />
                          )}
                          <span>{Math.abs(vegetable.priceChange)}%</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Category: {vegetable.category}</div>
                        <div>Nutrition: {vegetable.nutritionalValue}</div>
                        <div>Season: {vegetable.seasonality}</div>
                        <div className="mt-4">
                          <div className="text-sm text-gray-500 mb-1">Stock Level</div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${vegetable.stockLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </main>
  );
}
