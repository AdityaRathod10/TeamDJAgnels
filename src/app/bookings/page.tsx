'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Package,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Truck,
  ShoppingBag,
  ChevronDown,
  Star,
  Minus,
  Plus,
  Info
} from 'lucide-react';
import Image from 'next/image';

interface Booking {
  id: string;
  vendorName: string;
  vendorImage: string;
  items: {
    name: string;
    quantity: number;
    unit: string;
    price: number;
  }[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  bookingDate: string;
  paymentMethod: string;
  rating?: number;
}

interface VendorItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  minQuantity: number;
  maxQuantity: number;
  available: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const mockBookings: Booking[] = [
  {
    id: 'B001',
    vendorName: 'Fresh Farm Market',
    vendorImage: '/markets/market1.jpg',
    items: [
      { name: 'Tomatoes', quantity: 2, unit: 'kg', price: 80 },
      { name: 'Potatoes', quantity: 3, unit: 'kg', price: 90 },
      { name: 'Onions', quantity: 2, unit: 'kg', price: 60 }
    ],
    totalAmount: 230,
    status: 'confirmed',
    deliveryDate: '2025-01-30',
    deliveryTime: '10:00 AM - 12:00 PM',
    deliveryAddress: '123, Green Avenue, Mumbai',
    bookingDate: '2025-01-29',
    paymentMethod: 'UPI',
    rating: 4.5
  },
  {
    id: 'B002',
    vendorName: 'Green Valley Vendors',
    vendorImage: '/markets/market2.jpg',
    items: [
      { name: 'Carrots', quantity: 1, unit: 'kg', price: 40 },
      { name: 'Spinach', quantity: 2, unit: 'bundle', price: 60 }
    ],
    totalAmount: 100,
    status: 'pending',
    deliveryDate: '2025-01-31',
    deliveryTime: '2:00 PM - 4:00 PM',
    deliveryAddress: '456, Blue Street, Mumbai',
    bookingDate: '2025-01-29',
    paymentMethod: 'Cash'
  },
  {
    id: 'B003',
    vendorName: 'Urban Fresh Corner',
    vendorImage: '/markets/market3.jpg',
    items: [
      { name: 'Bell Peppers', quantity: 1, unit: 'kg', price: 120 },
      { name: 'Mushrooms', quantity: 0.5, unit: 'kg', price: 100 }
    ],
    totalAmount: 220,
    status: 'completed',
    deliveryDate: '2025-01-28',
    deliveryTime: '11:00 AM - 1:00 PM',
    deliveryAddress: '789, Red Road, Mumbai',
    bookingDate: '2025-01-27',
    paymentMethod: 'Card',
    rating: 5
  }
];

const mockItems: VendorItem[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 40,
    unit: 'kg',
    image: '/vegetables/tomatoes.jpg',
    minQuantity: 0.5,
    maxQuantity: 5,
    available: true
  },
  {
    id: '2',
    name: 'Potatoes',
    price: 30,
    unit: 'kg',
    image: '/vegetables/potatoes.jpg',
    minQuantity: 1,
    maxQuantity: 10,
    available: true
  },
  {
    id: '3',
    name: 'Onions',
    price: 35,
    unit: 'kg',
    image: '/vegetables/onions.jpg',
    minQuantity: 1,
    maxQuantity: 8,
    available: true
  }
];

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00 AM - 11:00 AM', available: true },
  { id: '2', time: '11:00 AM - 01:00 PM', available: true },
  { id: '3', time: '02:00 PM - 04:00 PM', available: true },
  { id: '4', time: '04:00 PM - 06:00 PM', available: false }
];

const filterOptions = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];
const sortOptions = ['Latest First', 'Oldest First', 'Amount: High to Low', 'Amount: Low to High'];

export default function Bookings() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'book-now'>('bookings');
  
  // Booking form state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [address, setAddress] = useState('');

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const toggleBookingExpansion = (id: string) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    const item = mockItems.find(i => i.id === itemId);
    if (!item) return;

    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(0, Math.min(currentQty + delta, item.maxQuantity));
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQty
    }));
  };

  const getTotalAmount = () => {
    return Object.entries(quantities).reduce((total, [itemId, quantity]) => {
      const item = mockItems.find(i => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getSelectedItems = () => {
    return mockItems.filter(item => (quantities[item.id] || 0) > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {activeTab === 'bookings' ? 'My Bookings' : 'Book Your Vegetables'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {activeTab === 'bookings' 
              ? 'Track and manage your vegetable deliveries from various vendors. View order status, delivery times, and past purchases.'
              : 'Select your vegetables, choose a convenient pickup time, and we will have them fresh and ready for you.'}
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'bookings'
                  ? 'bg-green-500 text-white shadow-md shadow-green-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('book-now')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'book-now'
                  ? 'bg-green-500 text-white shadow-md shadow-green-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Book Now
            </button>
          </div>
        </div>

        {activeTab === 'bookings' ? (
          <>
            {/* Search and Filter Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search bookings by vendor or items..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-3 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">Filters</span>
                    <motion.div
                      animate={{ rotate: showFilters ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  </button>
                </div>

                {/* Filter Options */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
                          <div className="flex flex-wrap gap-2">
                            {filterOptions.map((filter) => (
                              <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  selectedFilter === filter
                                    ? 'bg-green-500 text-white shadow-md shadow-green-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {filter}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
                          <select className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white">
                            {sortOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Bookings List */}
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
              className="max-w-4xl mx-auto space-y-6"
            >
              {mockBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  {/* Booking Header */}
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={booking.vendorImage}
                      alt={booking.vendorName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-2">{booking.vendorName}</h3>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-white/90 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>Ordered {new Date(booking.bookingDate).toLocaleDateString()}</span>
                            </div>
                            {booking.rating && (
                              <div className="flex items-center gap-1 text-white/90">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{booking.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full border ${getStatusColor(booking.status)} flex items-center gap-2`}>
                          {getStatusIcon(booking.status)}
                          <span className="font-medium capitalize">{booking.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Total Amount</div>
                        <div className="text-2xl font-semibold text-gray-900">₹{booking.totalAmount}</div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-300 flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          Reorder
                        </button>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Delivery Time</div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{booking.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Delivery Date</div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.deliveryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div className="border-t pt-6">
                      <button
                        onClick={() => toggleBookingExpansion(booking.id)}
                        className="w-full flex items-center justify-between text-gray-600 hover:text-gray-800"
                      >
                        <span className="font-medium">View Details</span>
                        <motion.div
                          animate={{ rotate: expandedBooking === booking.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedBooking === booking.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 space-y-6">
                              {/* Items */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
                                <div className="space-y-3">
                                  {booking.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                      <div className="flex items-center gap-3">
                                        <Package className="w-5 h-5 text-gray-400" />
                                        <div>
                                          <div className="font-medium text-gray-800">{item.name}</div>
                                          <div className="text-sm text-gray-500">
                                            {item.quantity} {item.unit}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="font-medium text-gray-800">₹{item.price}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Delivery Address */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Address</h4>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                  <span className="text-gray-600">{booking.deliveryAddress}</span>
                                </div>
                              </div>

                              {/* Payment Info */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Payment Method</h4>
                                <div className="p-3 bg-gray-50 rounded-xl">
                                  <div className="font-medium text-gray-800">{booking.paymentMethod}</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {mockBookings.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">No bookings yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start shopping from our wide selection of fresh vegetables!
                </p>
                <button className="px-8 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                  <ArrowRight className="w-5 h-5" />
                  Browse Markets
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Items Selection */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Search vegetables..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <button className="px-4 py-3 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-2">
                      <Filter className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600">Filter</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {mockItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-green-200 transition-all"
                      >
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600">₹{item.price}/{item.unit}</p>
                          <p className="text-sm text-gray-500">
                            Min: {item.minQuantity} {item.unit} | Max: {item.maxQuantity} {item.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -0.5)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            disabled={!quantities[item.id]}
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-16 text-center font-medium">
                            {quantities[item.id] || 0} {item.unit}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 0.5)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            disabled={quantities[item.id] >= item.maxQuantity}
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Details */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Booking Details</h2>

                  {/* Selected Items */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Items</h3>
                    <div className="space-y-3">
                      {getSelectedItems().map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} ({quantities[item.id]} {item.unit})
                          </span>
                          <span className="font-medium">₹{item.price * (quantities[item.id] || 0)}</span>
                        </div>
                      ))}
                      {getSelectedItems().length === 0 && (
                        <p className="text-gray-500 text-sm">No items selected</p>
                      )}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Select Date</h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Time Slot Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Select Time Slot</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          disabled={!slot.available}
                          className={`p-3 text-sm rounded-lg border transition-all ${
                            selectedTimeSlot === slot.id
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : slot.available
                              ? 'border-gray-200 hover:border-green-200'
                              : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Delivery Address</h3>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your delivery address..."
                      className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-24 resize-none"
                    />
                  </div>

                  {/* Total and Checkout */}
                  <div className="pt-6 border-t">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-2xl font-semibold text-gray-900">₹{getTotalAmount()}</span>
                    </div>
                    <button
                      className="w-full py-4 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      disabled={getSelectedItems().length === 0 || !selectedDate || !selectedTimeSlot || !address}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Confirm Booking
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
                      <Info className="w-4 h-4" />
                      Minimum order amount: ₹100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
