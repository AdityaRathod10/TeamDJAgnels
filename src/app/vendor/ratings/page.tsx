'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/20/solid';
import { ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import RatingModal from '@/components/RatingModal';
import { toast } from 'react-hot-toast';

interface Rating {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  timestamp: string;
  orderId: string;
}

// Mock data for demonstration
const mockRatings: Rating[] = [
  {
    id: 'r1',
    customerName: 'John Doe',
    rating: 5,
    comment: 'Great quality vegetables and excellent service!',
    timestamp: '2025-01-30T02:30:00+05:30',
    orderId: 'ORD123'
  },
  {
    id: 'r2',
    customerName: 'Jane Smith',
    rating: 4,
    comment: 'Fresh produce, but delivery was a bit delayed.',
    timestamp: '2025-01-29T15:45:00+05:30',
    orderId: 'ORD124'
  }
];

// Mock pending ratings
const mockPendingRatings = [
  {
    customerName: 'Alice Johnson',
    orderId: 'ORD125',
    orderDate: '2025-01-30T01:30:00+05:30'
  },
  {
    customerName: 'Bob Wilson',
    orderId: 'ORD126',
    orderDate: '2025-01-30T00:15:00+05:30'
  }
];

export default function VendorRatings() {
  const [ratings, setRatings] = useState<Rating[]>(mockRatings);
  const [pendingRatings] = useState(mockPendingRatings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    name: string;
    orderId: string;
  } | null>(null);

  const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

  const handleRatingSubmit = (data: any) => {
    const newRating: Rating = {
      id: `r${Date.now()}`,
      customerName: data.customerName,
      rating: data.rating,
      comment: data.comment,
      timestamp: data.timestamp,
      orderId: data.orderId
    };

    setRatings(prev => [newRating, ...prev]);
    toast.success('Rating submitted successfully!');
  };

  const openRatingModal = (customer: { name: string; orderId: string }) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Ratings</h1>
        <p className="text-gray-600">View and manage your customer feedback</p>
      </motion.div>

      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Overall Rating</h2>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-gray-800">{averageRating.toFixed(1)}</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 ${
                      star <= averageRating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">({ratings.length} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Last 30 days</p>
            <p className="text-2xl font-bold text-green-600">+{ratings.length} new reviews</p>
          </div>
        </div>
      </motion.div>

      {/* Pending Ratings */}
      {pendingRatings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Ratings</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingRatings.map((pending) => (
              <motion.div
                key={pending.orderId}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-green-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{pending.customerName}</h3>
                      <p className="text-sm text-gray-500">Order ID: {pending.orderId}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openRatingModal({
                      name: pending.customerName,
                      orderId: pending.orderId
                    })}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                  >
                    Rate Now
                  </motion.button>
                </div>
                <p className="text-sm text-gray-600">
                  Order Date: {new Date(pending.orderDate).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Reviews</h2>
        <div className="grid gap-4">
          {ratings.map((rating, index) => (
            <motion.div
              key={rating.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                    {rating.customerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{rating.customerName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(rating.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-600">
                <ChatBubbleLeftIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>{rating.comment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rating Modal */}
      {selectedCustomer && (
        <RatingModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
          onSubmit={handleRatingSubmit}
          customerName={selectedCustomer.name}
          orderId={selectedCustomer.orderId}
        />
      )}
    </div>
  );
}