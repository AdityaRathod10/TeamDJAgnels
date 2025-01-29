'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Activity, Users, ShoppingBag, Clock, AlertTriangle } from 'lucide-react';
import { Market } from '@/types/market';

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

interface MarketDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: Market | null;
  marketStatus: MarketStatus | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
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

export default function MarketDetailsModal({
  isOpen,
  onClose,
  market,
  marketStatus
}: MarketDetailsModalProps) {
  if (!market || !marketStatus) return null;

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBg = (value: number) => {
    if (value >= 80) return 'bg-green-50';
    if (value >= 50) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with Image */}
            <div className="relative h-48">
              <img
                src={market.imageUrl}
                alt={market.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-bold text-white mb-1">{market.name}</h2>
                <p className="text-white/90 text-sm">{market.location}</p>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <motion.div 
              className="p-6 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Live Status Section */}
              <div className="grid grid-cols-3 gap-6">
                <motion.div 
                  variants={itemVariants}
                  className={`p-4 rounded-xl ${getStatusBg(marketStatus.crowdLevel)}`}
                >
                  <div className="text-sm font-medium text-gray-700 mb-1">Crowd Level</div>
                  <div className={`text-2xl font-bold ${getStatusColor(marketStatus.crowdLevel)}`}>
                    {marketStatus.crowdLevel}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Current Occupancy</div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className={`p-4 rounded-xl ${getStatusBg(marketStatus.stockAvailability)}`}
                >
                  <div className="text-sm font-medium text-gray-700 mb-1">Stock Level</div>
                  <div className={`text-2xl font-bold ${getStatusColor(marketStatus.stockAvailability)}`}>
                    {marketStatus.stockAvailability}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Available Items</div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl bg-blue-50"
                >
                  <div className="text-sm font-medium text-gray-700 mb-1">Active Vendors</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {marketStatus.activeVendors}/{marketStatus.vendorCount}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Currently Open</div>
                </motion.div>
              </div>

              {/* Price Trends */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Live Price Updates</h3>
                <div className="grid grid-cols-2 gap-4">
                  {marketStatus.priceChanges.map((change, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{change.vegetable}</div>
                        <div className="text-sm text-gray-600">₹{change.currentPrice}/kg</div>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        change.change > 0 ? 'text-red-500' : change.change < 0 ? 'text-green-500' : 'text-gray-500'
                      }`}>
                        {change.change > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : change.change < 0 ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : (
                          <Activity className="w-4 h-4" />
                        )}
                        <span className="font-medium">{Math.abs(change.change)}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Market Info */}
              <motion.div variants={itemVariants} className="border-t pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Market Hours</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{marketStatus.openingTime} - {marketStatus.closingTime}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Last Updated</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <AlertTriangle className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{marketStatus.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
