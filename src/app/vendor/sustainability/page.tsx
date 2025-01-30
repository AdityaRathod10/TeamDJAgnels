'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnsoldItem, SustainabilityMetrics } from '@/types';
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  GlobeAsiaAustraliaIcon,
  UsersIcon,
  TrophyIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChartBarIcon,
} from '@heroicons/react/20/solid';
import AddDonationModal from '@/components/AddDonationModal';
import { toast } from 'react-hot-toast';

// Mock data for demonstration
const mockUnsoldItems: UnsoldItem[] = [
  {
    id: 'u1',
    vendorId: 'v1',
    items: [
      {
        name: 'Tomatoes',
        quantity: 5,
        unit: 'kg',
        condition: 'good',
        bestBeforeTime: '2025-01-30T18:00:00+05:30',
        price: {
          original: 60,
          discounted: 30
        }
      },
      {
        name: 'Spinach',
        quantity: 2,
        unit: 'kg',
        condition: 'fair',
        bestBeforeTime: '2025-01-30T12:00:00+05:30',
        price: {
          original: 40,
          discounted: 20
        }
      }
    ],
    status: 'available',
    pickupDetails: {
      location: {
        address: 'Near City Hospital Gate',
        landmark: 'Opposite Bus Stop',
        coordinates: {
          lat: 19.0760,
          lng: 72.8777
        }
      },
      timeWindow: {
        start: '2025-01-29T18:00:00+05:30',
        end: '2025-01-29T20:00:00+05:30'
      },
      instructions: 'Please bring your own bags'
    },
    sustainability: {
      potentialWasteSaved: 7,
      carbonFootprint: 3.5,
      peopleImpacted: 14
    },
    createdAt: '2025-01-29T14:02:15+05:30',
    updatedAt: '2025-01-29T14:02:15+05:30'
  }
];

const mockSustainabilityMetrics: SustainabilityMetrics = {
  vendorId: 'v1',
  totalStats: {
    wastePreventedKg: 245,
    carbonSavedKg: 122.5,
    peopleHelped: 490,
    donationsCount: 35
  },
  monthlyStats: [
    {
      month: '2025-01',
      wastePreventedKg: 45,
      carbonSavedKg: 22.5,
      peopleHelped: 90,
      donationsCount: 8
    },
    {
      month: '2024-12',
      wastePreventedKg: 52,
      carbonSavedKg: 26,
      peopleHelped: 104,
      donationsCount: 7
    }
  ],
  badges: [
    {
      name: 'Zero Waste Champion',
      earnedAt: '2024-12-15T00:00:00+05:30',
      description: 'Prevented over 200kg of food waste'
    },
    {
      name: 'Community Hero',
      earnedAt: '2024-11-20T00:00:00+05:30',
      description: 'Helped over 400 people through donations'
    }
  ],
  impactRank: 1,
  sustainabilityScore: 95
};

export default function VendorSustainability() {
  const [metrics, setMetrics] = useState<SustainabilityMetrics>(mockSustainabilityMetrics);
  const [unsoldItems, setUnsoldItems] = useState<UnsoldItem[]>(mockUnsoldItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UnsoldItem | null>(null);

  const handleAddDonation = (data: any) => {
    const newItem: UnsoldItem = {
      id: `u${Date.now()}`, // Corrected to use backticks
      vendorId: 'v1',
      items: [
        {
          name: data.name,
          quantity: Number(data.quantity),
          unit: data.unit,
          condition: data.condition,
          bestBeforeTime: data.bestBeforeTime,
          price: {
            original: Number(data.originalPrice),
            discounted: Number(data.discountedPrice)
          }
        }
      ],
      status: 'available',
      pickupDetails: {
        location: {
          address: data.location,
          landmark: '',
          coordinates: { lat: 0, lng: 0 }
        },
        timeWindow: {
          start: new Date().toISOString(),
          end: new Date(data.bestBeforeTime).toISOString()
        },
        instructions: data.instructions
      },
      sustainability: {
        potentialWasteSaved: Number(data.quantity),
        carbonFootprint: Number(data.quantity) * 0.5,
        peopleImpacted: Math.ceil(Number(data.quantity) * 2)
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setUnsoldItems(prev => [newItem, ...prev]);
    toast.success('New donation added successfully!');
  };

  const handleMarkAsDonated = (itemId: string) => {
    setUnsoldItems(prev => prev.filter(item => item.id !== itemId));
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalStats: {
        ...prev.totalStats,
        donationsCount: prev.totalStats.donationsCount + 1,
        wastePreventedKg: prev.totalStats.wastePreventedKg + 5, // Example value
        carbonSavedKg: prev.totalStats.carbonSavedKg + 2.5, // Example value
        peopleHelped: prev.totalStats.peopleHelped + 10 // Example value
      }
    }));

    toast.success('Item marked as donated!');
  };

  const handleEditItem = (item: UnsoldItem) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sustainability Impact</h1>
        <p className="text-gray-600">Track your contribution to environmental sustainability</p>
      </motion.div>

      {/* Impact Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Repeat for other stats */}
      </motion.div>

      {/* Add the modal */}
      <AddDonationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddDonation}
      />

      {/* Add toast container */}
      <div className="fixed bottom-4 right-4 z-50" />
    </div>
  );
}
