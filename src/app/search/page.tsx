'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, Star, SlidersHorizontal, ChevronDown, Leaf, ShoppingCart, Map } from 'lucide-react';
import { Vendor, VegetableItem } from '@/types';
import VendorMapModal from '@/components/VendorMapModal';

// Mock data (replace with API calls later)
const mockVegetables = [
  'Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Cabbage', 
  'Spinach', 'Cucumber', 'Bell Peppers', 'Cauliflower', 'Broccoli',
  'Beans', 'Peas', 'Eggplant', 'Okra', 'Mushrooms'
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
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '2',
        name: 'Potatoes',
        price: 30,
        unit: 'kg',
        quantity: 150,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '3',
        name: 'Onions',
        price: 35,
        unit: 'kg',
        quantity: 120,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      }
    ]
  },
  {
    id: '2',
    name: 'Green Valley Vegetables',
    marketName: 'West Side Market',
    location: 'Western Suburbs',
    rating: 4.8,
    distance: 2.5,
    vegetables: [
      {
        id: '4',
        name: 'Tomatoes',
        price: 38,
        unit: 'kg',
        quantity: 80,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '5',
        name: 'Bell Peppers',
        price: 60,
        unit: 'kg',
        quantity: 75,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '6',
        name: 'Cucumber',
        price: 35,
        unit: 'kg',
        quantity: 90,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      }
    ]
  },
  {
    id: '3',
    name: 'Organic Paradise',
    marketName: 'East End Bazaar',
    location: 'Eastern District',
    rating: 4.9,
    distance: 3.8,
    vegetables: [
      {
        id: '6',
        name: 'Broccoli',
        price: 80,
        unit: 'kg',
        quantity: 40,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '7',
        name: 'Carrots',
        price: 45,
        unit: 'kg',
        quantity: 120,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      }
    ]
  },
  {
    id: '4',
    name: 'Local Harvest',
    marketName: 'South Market Complex',
    location: 'Southern Area',
    rating: 4.2,
    distance: 0.8,
    vegetables: [
      {
        id: '8',
        name: 'Onions',
        price: 35,
        unit: 'kg',
        quantity: 200,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '9',
        name: 'Potatoes',
        price: 28,
        unit: 'kg',
        quantity: 180,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '10',
        name: 'Cabbage',
        price: 30,
        unit: 'piece',
        quantity: 60,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      }
    ]
  },
  {
    id: '5',
    name: 'Farm Fresh Direct',
    marketName: 'North Square',
    location: 'Northern District',
    rating: 4.6,
    distance: 1.5,
    vegetables: [
      {
        id: '11',
        name: 'Mushrooms',
        price: 120,
        unit: 'kg',
        quantity: 30,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: false
      },
      {
        id: '12',
        name: 'Bell Peppers',
        price: 55,
        unit: 'kg',
        quantity: 65,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      }
    ]
  },
  {
    id: '6',
    name: 'Nature\'s Basket',
    marketName: 'Central Complex',
    location: 'City Center',
    rating: 4.7,
    distance: 2.0,
    vegetables: [
      {
        id: '13',
        name: 'Beans',
        price: 50,
        unit: 'kg',
        quantity: 70,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '14',
        name: 'Peas',
        price: 60,
        unit: 'kg',
        quantity: 55,
        quality: 5,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: true
      },
      {
        id: '15',
        name: 'Eggplant',
        price: 40,
        unit: 'kg',
        quantity: 85,
        quality: 4,
        lastUpdated: '2025-01-29T10:36:14+05:30',
        inStock: false
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.3
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
      damping: 15,
      duration: 0.3
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVegetable, setSelectedVegetable] = useState('');
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('distance');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVendorIds, setSelectedVendorIds] = useState<Set<string>>(new Set());
  const [mapModalVendor, setMapModalVendor] = useState<Vendor | null>(null);

  // Function to get all vendors selling a specific vegetable
  const getVendorsForVegetable = (vegetableName: string) => {
    return mockVendors.filter(vendor =>
      vendor.vegetables.some(v => v.name.toLowerCase() === vegetableName.toLowerCase())
    );
  };

  // Function to compare prices for a specific vegetable
  const compareVegetablePrices = (vegetableName: string) => {
    return mockVendors
      .filter(vendor => vendor.vegetables.some(v => v.name.toLowerCase() === vegetableName.toLowerCase()))
      .map(vendor => ({
        vendor,
        vegetable: vendor.vegetables.find(v => v.name.toLowerCase() === vegetableName.toLowerCase())!
      }))
      .sort((a, b) => a.vegetable.price - b.vegetable.price);
  };

  useEffect(() => {
    let results = mockVendors;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(vendor => {
        const matchesVendor = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.marketName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesVegetable = vendor.vegetables.some(v => 
          v.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesVendor || matchesVegetable;
      });
    }

    // Filter by selected vegetable
    if (selectedVegetable) {
      results = results.filter(vendor =>
        vendor.vegetables.some(v => v.name === selectedVegetable)
      );
    }

    // Filter by distance and rating
    results = results.filter(vendor => 
      vendor.distance <= maxDistance && 
      vendor.rating >= minRating
    );

    // Sort results
    results.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price' && selectedVegetable) {
        const aPrice = a.vegetables.find(v => v.name === selectedVegetable)?.price || 0;
        const bPrice = b.vegetables.find(v => v.name === selectedVegetable)?.price || 0;
        return aPrice - bPrice;
      }
      return 0;
    });

    setFilteredVendors(results);
  }, [searchQuery, selectedVegetable, maxDistance, minRating, sortBy]);

  const toggleVendorSelection = (vendorId: string) => {
    const newSelection = new Set(selectedVendorIds);
    if (newSelection.has(vendorId)) {
      newSelection.delete(vendorId);
    } else {
      newSelection.add(vendorId);
    }
    setSelectedVendorIds(newSelection);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 tracking-tight">
            Find Fresh Vegetables
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search through our network of trusted vendors to find the freshest vegetables at the best prices
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8 space-y-4"
          variants={itemVariants}
        >
          {/* Main Search Bar */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vendors or markets..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-gray-900 placeholder-gray-500 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="w-full md:w-64 pl-4 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white text-gray-900"
                value={selectedVegetable}
                onChange={(e) => setSelectedVegetable(e.target.value)}
              >
                <option value="">All Vegetables</option>
                {mockVegetables.map(veg => (
                  <option key={veg} value={veg} className="text-gray-900">{veg}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Filters Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-green-600 font-medium mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>

          {/* Filters */}
          <motion.div 
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${showFilters ? 'mb-6' : ''}`}
          >
            <div className="grid md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Distance ({maxDistance}km)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating ({minRating}★)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white text-gray-900"
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price (if vegetable selected)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Selected Vegetable Comparison */}
        {selectedVegetable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8 bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Comparing prices for {selectedVegetable}
            </h3>
            <div className="grid gap-4">
              {compareVegetablePrices(selectedVegetable).map(({ vendor, vegetable }) => (
                <div key={vendor.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800">{vendor.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.distance}km away</span>
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-green-600">₹{vegetable.price}/{vegetable.unit}</span>
                    <button
                      onClick={() => toggleVendorSelection(vendor.id)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        selectedVendorIds.has(vendor.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        <motion.div 
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {filteredVendors.map(vendor => (
            <motion.div
              key={vendor.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg p-6 border transition-all duration-200 ${
                selectedVendorIds.has(vendor.id)
                  ? 'border-green-500 ring-2 ring-green-500'
                  : 'border-gray-100 hover:shadow-xl'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{vendor.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="text-gray-600">{vendor.marketName}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMapModalVendor(vendor)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Map className="w-5 h-5" />
                  </button>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {vendor.distance}km
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 text-gray-700 font-medium">{vendor.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                {vendor.vegetables.map(veg => (
                  <div key={veg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-800">{veg.name}</span>
                    </div>
                    <div className="text-green-700 font-semibold">
                      ₹{veg.price}/{veg.unit}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map Modal */}
        {mapModalVendor && (
          <VendorMapModal
            isOpen={!!mapModalVendor}
            onClose={() => setMapModalVendor(null)}
            vendor={mapModalVendor}
          />
        )}

        {filteredVendors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No vendors found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
