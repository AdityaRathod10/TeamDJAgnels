'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Package, Filter, Search, ArrowRight, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import Image from 'next/image';

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

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [address, setAddress] = useState('');

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
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Vegetables</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your vegetables, choose a convenient pickup time, and we'll have them fresh and ready for you.
          </p>
        </div>

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
      </motion.div>
    </main>
  );
}
