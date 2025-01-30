'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search as SearchIcon, 
  SlidersHorizontal, 
  ChevronDown, 
  Store, 
  Clock, 
  Users, 
  Carrot,
  Star,
  MapPin,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpDown,
  BarChart3
} from 'lucide-react';
import MarketDetailsModal from '@/components/MarketDetailsModal';

// Mock data
const mockMarkets = [
  {
    id: '1',
    name: 'Crawford Market',
    location: 'Fort, Mumbai',
    description: 'Historic wholesale market known for fresh fruits and vegetables',
    rating: 4.5,
    distance: 1.2,
    openingHours: '06:00',
    closingHours: '20:00',
    facilities: ['Parking', 'Restrooms', 'Cold Storage'],
    imageUrl: 'https://media.istockphoto.com/id/484714478/photo/elderly-indian-man.jpg?s=612x612&w=0&k=20&c=Lzv0GTbgMLInnwsiz-8zqjoqfq-5FgMNjtaXaOF0WJY=',
    vendorCount: 250,
    vegetableTypes: 45,
    averagePriceRange: {
      min: 20,
      max: 60
    }
  },
  {
    id: '2',
    name: 'Dadar Market',
    location: 'Dadar West, Mumbai',
    description: 'Bustling local market with competitive prices',
    rating: 4.2,
    distance: 2.5,
    openingHours: '05:00',
    closingHours: '21:00',
    facilities: ['Parking', 'Cafe'],
    imageUrl: 'https://media.istockphoto.com/id/501452950/photo/greengrocer-shop-nuwara-eliya-central-market-sri-lanka.jpg?s=612x612&w=0&k=20&c=Whdo3k5q5q4cwmEF3r4YxXXyW9L3aj20jLjwbUNQ6JU=',
    vendorCount: 180,
    vegetableTypes: 35,
    averagePriceRange: {
      min: 15,
      max: 50
    }
  },
  {
    id: '3',
    name: 'Bandra Farmers Market',
    location: 'Bandra West, Mumbai',
    description: 'Premium market with organic and local produce',
    rating: 4.7,
    distance: 3.8,
    openingHours: '07:00',
    closingHours: '19:00',
    facilities: ['Parking', 'Restrooms', 'Cafe'],
    imageUrl: 'https://media.istockphoto.com/id/481095126/photo/nepali-street-seller-selling-flowers-and-vegetables-in-patan-nepal.jpg?s=612x612&w=0&k=20&c=NrBN2HRsLuUfswP4jWOOVjdLwfhtnLYO7Znh3xn2-RY=',
    vendorCount: 120,
    vegetableTypes: 40,
    averagePriceRange: {
      min: 30,
      max: 80
    }
  },
  {
    id: '4',
    name: 'Vashi APMC Market',
    location: 'Vashi, Navi Mumbai',
    description: 'Largest wholesale market in the region',
    rating: 4.3,
    distance: 15.2,
    openingHours: '04:00',
    closingHours: '22:00',
    facilities: ['Parking', 'Restrooms', 'Cold Storage'],
    imageUrl: 'https://media.istockphoto.com/id/491960200/photo/local-vegetable-market-in-india.jpg?s=612x612&w=0&k=20&c=wcYk_6NetigS5MKERga2gRlRY6Er90sdHRkMX3MBgZc=',
    vendorCount: 500,
    vegetableTypes: 60,
    averagePriceRange: {
      min: 10,
      max: 45
    }
  },
  {
    id: '5',
    name: 'Malad Market',
    location: 'Malad West, Mumbai',
    description: 'Local community market with fresh daily produce',
    rating: 4.1,
    distance: 8.5,
    openingHours: '06:00',
    closingHours: '20:00',
    facilities: ['Parking', 'Restrooms'],
    imageUrl: 'https://media.istockphoto.com/id/1226029166/photo/fruts-vegetables-at-market-india.jpg?s=612x612&w=0&k=20&c=2zOAPF32PTDonIvCUA1PyBhXQ1X0UcKDmQKtknz_sAA=',
    vendorCount: 150,
    vegetableTypes: 30,
    averagePriceRange: {
      min: 25,
      max: 65
    }
  },
  {
    id: '6',
    name: 'Borivali Market',
    location: 'Borivali West, Mumbai',
    description: 'Modern market complex with diverse vegetable selection',
    rating: 4.4,
    distance: 12.3,
    openingHours: '06:00',
    closingHours: '21:00',
    facilities: ['Parking', 'Restrooms', 'Cafe', 'Cold Storage'],
    imageUrl: 'https://media.istockphoto.com/id/1463476542/photo/indian-street-sellers-selling-vegetables-in-jaipur-india.jpg?s=612x612&w=0&k=20&c=AX8PYEMME1XNrTLuLjh5Pq8N6hslBftVOc7rRVLMfDs=',
    vendorCount: 200,
    vegetableTypes: 50,
    averagePriceRange: {
      min: 20,
      max: 70
    }
  }
];

const mockMarketStatus = [
  {
    id: '1',
    name: 'Crawford Market',
    crowdLevel: 75,
    priceVolatility: 15,
    stockAvailability: 85,
    isOpen: true,
    openingTime: '06:00',
    closingTime: '20:00',
    vendorCount: 250,
    activeVendors: 220,
    lastUpdated: '5 minutes ago',
    priceChanges: [
      { vegetable: 'Tomatoes', change: -5, currentPrice: 40 },
      { vegetable: 'Onions', change: 2, currentPrice: 35 },
      { vegetable: 'Potatoes', change: 0, currentPrice: 30 }
    ]
  },
  {
    id: '2',
    name: 'Dadar Market',
    crowdLevel: 60,
    priceVolatility: 10,
    stockAvailability: 90,
    isOpen: true,
    openingTime: '05:00',
    closingTime: '21:00',
    vendorCount: 180,
    activeVendors: 165,
    lastUpdated: '10 minutes ago',
    priceChanges: [
      { vegetable: 'Carrots', change: 3, currentPrice: 45 },
      { vegetable: 'Cabbage', change: -2, currentPrice: 30 },
      { vegetable: 'Cauliflower', change: 5, currentPrice: 40 }
    ]
  },
  {
    id: '3',
    name: 'Bandra Farmers Market',
    crowdLevel: 45,
    priceVolatility: 5,
    stockAvailability: 95,
    isOpen: true,
    openingTime: '07:00',
    closingTime: '19:00',
    vendorCount: 120,
    activeVendors: 110,
    lastUpdated: '15 minutes ago',
    priceChanges: [
      { vegetable: 'Bell Peppers', change: 0, currentPrice: 60 },
      { vegetable: 'Mushrooms', change: -3, currentPrice: 120 },
      { vegetable: 'Broccoli', change: 2, currentPrice: 80 }
    ]
  },
  {
    id: '4',
    name: 'Vashi APMC Market',
    crowdLevel: 85,
    priceVolatility: 20,
    stockAvailability: 95,
    isOpen: true,
    openingTime: '04:00',
    closingTime: '22:00',
    vendorCount: 500,
    activeVendors: 450,
    lastUpdated: '8 minutes ago',
    priceChanges: [
      { vegetable: 'Spinach', change: -2, currentPrice: 25 },
      { vegetable: 'Cucumber', change: 1, currentPrice: 30 },
      { vegetable: 'Eggplant', change: -4, currentPrice: 35 }
    ]
  },
  {
    id: '5',
    name: 'Malad Market',
    crowdLevel: 55,
    priceVolatility: 8,
    stockAvailability: 80,
    isOpen: true,
    openingTime: '06:00',
    closingTime: '20:00',
    vendorCount: 150,
    activeVendors: 130,
    lastUpdated: '12 minutes ago',
    priceChanges: [
      { vegetable: 'Lady Finger', change: 2, currentPrice: 45 },
      { vegetable: 'Bitter Gourd', change: -1, currentPrice: 50 },
      { vegetable: 'Green Peas', change: 3, currentPrice: 60 }
    ]
  },
  {
    id: '6',
    name: 'Borivali Market',
    crowdLevel: 65,
    priceVolatility: 12,
    stockAvailability: 88,
    isOpen: true,
    openingTime: '06:00',
    closingTime: '21:00',
    vendorCount: 200,
    activeVendors: 180,
    lastUpdated: '7 minutes ago',
    priceChanges: [
      { vegetable: 'Sweet Potato', change: -3, currentPrice: 35 },
      { vegetable: 'Green Beans', change: 2, currentPrice: 40 },
      { vegetable: 'Capsicum', change: 1, currentPrice: 55 }
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

export default function MarketsPage() {
  const [markets, setMarkets] = useState(mockMarkets);
  const [marketStatuses, setMarketStatuses] = useState(mockMarketStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<typeof mockMarkets[0] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'vendorCount'>('distance');

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  useEffect(() => {
    let results = markets;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(market =>
        market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by distance and rating
    results = results.filter(market =>
      market.distance <= 10 &&
      market.rating >= 0
    );

    // Sort results
    results.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'vendorCount') return b.vendorCount - a.vendorCount;
      return 0;
    });

    setMarkets(results);
  }, [searchQuery, sortBy]);

  const handleMarketClick = (market: any) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <motion.div 
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Local Markets</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the freshest produce at your nearby markets. Compare prices, check facilities, 
            and find the perfect market for your shopping needs.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto mb-8 space-y-4"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search markets by name or location..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-gray-900 placeholder-gray-500 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Filters */}
          <motion.div 
            initial={false}
            animate={{ height: filterOpen ? 'auto' : 0, opacity: filterOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${filterOpen ? 'mb-6' : ''}`}
          >
            <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Distance (10km)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={10}
                  onChange={(e) => console.log(e.target.value)}
                  className="w-full accent-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating (0★)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={0}
                  onChange={(e) => console.log(e.target.value)}
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
                    onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'vendorCount')}
                    className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white text-gray-900"
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="vendorCount">Number of Vendors</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Market Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {mockMarkets.map((market) => (
            <motion.div
              key={market.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
            >
              {/* Market Image */}
              <div className="relative h-48">
                <img
                  src={market.imageUrl}
                  alt={market.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{market.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{market.location}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-800">{market.rating}</span>
                </div>
              </div>

              {/* Market Content */}
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 line-clamp-2">{market.description}</p>

                {/* Market Status */}
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Crowd Level</div>
                      <div className={`text-lg font-semibold ${getStatusColor(marketStatuses.find(s => s.id === market.id)?.crowdLevel || 0)}`}>
                        {marketStatuses.find(s => s.id === market.id)?.crowdLevel || 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Stock</div>
                      <div className={`text-lg font-semibold ${getStatusColor(marketStatuses.find(s => s.id === market.id)?.stockAvailability || 0)}`}>
                        {marketStatuses.find(s => s.id === market.id)?.stockAvailability || 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Active Vendors</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {marketStatuses.find(s => s.id === market.id)?.activeVendors || 0}/
                        {marketStatuses.find(s => s.id === market.id)?.vendorCount || 0}
                      </div>
                    </div>
                  </div>

                  {/* Price Changes */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-500 mb-2">Recent Price Changes</div>
                    <div className="space-y-2">
                      {(marketStatuses.find(s => s.id === market.id)?.priceChanges || []).map((change, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700">{change.vegetable}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800">₹{change.currentPrice}/kg</span>
                            <span className={`flex items-center ${change.change > 0 ? 'text-red-500' : change.change < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                              {change.change > 0 ? <TrendingUp className="w-4 h-4" /> : change.change < 0 ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                              {Math.abs(change.change)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleMarketClick(market)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Store className="w-4 h-4" />
                    View Live Status
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Details Modal */}
        {selectedMarket && (
          <MarketDetailsModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedMarket(null);
            }}
            market={selectedMarket}
            marketStatus={marketStatuses.find(s => s.id === selectedMarket.id) || null}
          />
        )}
      </motion.div>
    </main>
  );
}

interface MarketStatus {
  id: string;
  name: string;
  crowdLevel: number;
  priceVolatility: number;
  stockAvailability: number;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  vendorCount: number;
  activeVendors: number;
  lastUpdated: string;
  priceChanges: {
    vegetable: string;
    change: number;
    currentPrice: number;
  }[];
}
