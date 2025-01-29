'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Truck,
  Search,
  Filter,
  Edit3,
  Plus,
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; unit: string }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  pickupTime: string;
  customerImage: string;
}

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  price: number;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    items: [
      { name: 'Tomatoes', quantity: 2, unit: 'kg' },
      { name: 'Potatoes', quantity: 3, unit: 'kg' }
    ],
    total: 250,
    status: 'pending',
    pickupTime: '10:00 AM',
    customerImage: '/customers/customer1.jpg'
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    items: [
      { name: 'Onions', quantity: 1, unit: 'kg' },
      { name: 'Carrots', quantity: 2, unit: 'kg' }
    ],
    total: 180,
    status: 'confirmed',
    pickupTime: '11:30 AM',
    customerImage: '/customers/customer2.jpg'
  }
];

const mockInventory: InventoryItem[] = [
  {
    id: 'VEG001',
    name: 'Fresh Tomatoes',
    stock: 50,
    unit: 'kg',
    price: 40,
    image: '/vegetables/tomatoes.jpg',
    status: 'in-stock'
  },
  {
    id: 'VEG002',
    name: 'Potatoes',
    stock: 10,
    unit: 'kg',
    price: 30,
    image: '/vegetables/potatoes.jpg',
    status: 'low-stock'
  },
  {
    id: 'VEG003',
    name: 'Onions',
    stock: 0,
    unit: 'kg',
    price: 35,
    image: '/vegetables/onions.jpg',
    status: 'out-of-stock'
  }
];

const analytics = {
  totalOrders: 156,
  totalRevenue: 45600,
  averageOrderValue: 292,
  activeCustomers: 89,
  growth: 12.5,
  popularItems: ['Tomatoes', 'Potatoes', 'Onions']
};

export default function VendorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { t } = useLanguage();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
    }
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
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('dashboard')}</h1>
            <p className="text-gray-600">{t('welcomeMessage')}</p>
          </div>
          <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t('addNewItem')}
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 mb-2">{t('totalOrders')}</h3>
            <p className="text-3xl font-bold text-gray-800">{analytics.totalOrders}</p>
            <p className="text-sm text-green-600 mt-2">+{analytics.growth}% {t('fromLastMonth')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 mb-2">{t('totalRevenue')}</h3>
            <p className="text-3xl font-bold text-gray-800">₹{analytics.totalRevenue}</p>
            <p className="text-sm text-green-600 mt-2">+8.2% {t('fromLastMonth')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-gray-600 mb-2">{t('averageOrder')}</h3>
            <p className="text-3xl font-bold text-gray-800">₹{analytics.averageOrderValue}</p>
            <p className="text-sm text-red-600 mt-2">-2.3% {t('fromLastMonth')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 mb-2">{t('activeCustomers')}</h3>
            <p className="text-3xl font-bold text-gray-800">{analytics.activeCustomers}</p>
            <p className="text-sm text-green-600 mt-2">+4.5% {t('fromLastMonth')}</p>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{t('recentOrders')}</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
              {t('viewAll')}
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
              >
                <option value="all">{t('all')}</option>
                <option value="pending">{t('orderStatus.pending')}</option>
                <option value="confirmed">{t('orderStatus.confirmed')}</option>
                <option value="completed">{t('orderStatus.completed')}</option>
                <option value="cancelled">{t('orderStatus.cancelled')}</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">{t('customer')}</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">{t('items')}</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">{t('total')}</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">{t('status')}</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">{t('pickupTime')}</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={order.customerImage}
                            alt={order.customerName}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{order.customerName}</p>
                          <p className="text-sm text-gray-500">#{order.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-gray-600">
                            {item.quantity} {item.unit} {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-800">₹{order.total}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium">
                          {t(`orderStatus.${order.status}`)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{order.pickupTime}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
