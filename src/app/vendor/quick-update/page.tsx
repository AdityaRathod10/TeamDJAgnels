'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  TrendingUp,
  TrendingDown,
  Save,
  Search,
  Filter,
  Plus,
  Minus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  currentPrice: number;
  previousPrice: number;
  image: string;
  category: string;
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: 'VEG001',
    name: 'Fresh Tomatoes',
    currentStock: 50,
    unit: 'kg',
    currentPrice: 40,
    previousPrice: 35,
    image: '/vegetables/tomatoes.jpg',
    category: 'Vegetables',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'VEG002',
    name: 'Potatoes',
    currentStock: 75,
    unit: 'kg',
    currentPrice: 30,
    previousPrice: 30,
    image: '/vegetables/potatoes.jpg',
    category: 'Vegetables',
    lastUpdated: '1 hour ago'
  },
  {
    id: 'VEG003',
    name: 'Onions',
    currentStock: 45,
    unit: 'kg',
    currentPrice: 35,
    previousPrice: 40,
    image: '/vegetables/onions.jpg',
    category: 'Vegetables',
    lastUpdated: '30 minutes ago'
  }
];

const categories = ['All', 'Vegetables', 'Fruits', 'Leafy Greens', 'Herbs'];

export default function QuickUpdate() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inventory, setInventory] = useState(mockInventory);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStockChange = (id: string, change: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          currentStock: Math.max(0, item.currentStock + change)
        };
      }
      return item;
    }));
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          currentPrice: Math.max(0, newPrice)
        };
      }
      return item;
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Quick Update</h1>
            <p className="text-gray-600">
              Update your inventory and prices in real-time
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </motion.button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Changes saved successfully!
          </motion.div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Last updated: {item.lastUpdated}</p>
                </div>
              </div>

              {/* Stock Control */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 mb-2 block">Current Stock</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleStockChange(item.id, -1)}
                    className="p-2 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-xl font-medium text-gray-800">
                      {item.currentStock}
                    </span>
                    <span className="text-gray-500 ml-1">{item.unit}</span>
                  </div>
                  <button
                    onClick={() => handleStockChange(item.id, 1)}
                    className="p-2 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Price Control */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Price per {item.unit}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={item.currentPrice}
                    onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Previous: ₹{item.previousPrice}</span>
                  {item.currentPrice !== item.previousPrice && (
                    <span className={`flex items-center text-sm ${
                      item.currentPrice > item.previousPrice ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {item.currentPrice > item.previousPrice ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(((item.currentPrice - item.previousPrice) / item.previousPrice) * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
