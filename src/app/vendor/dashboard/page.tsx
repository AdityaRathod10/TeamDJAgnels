'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Enhanced chart data
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 35000, 40000, 42000, 45600, 45000],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(34, 197, 94)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8
    }
  ]
};

const orderData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Orders',
      data: [120, 130, 140, 145, 156, 150],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 8,
      barThickness: 20,
      hoverBackgroundColor: 'rgb(59, 130, 246)'
    }
  ]
};

const customerTypeData = {
  labels: ['New', 'Returning', 'Premium'],
  datasets: [
    {
      data: [30, 45, 25],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 4
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        padding: 20,
        font: {
          size: 12,
          weight: 'bold' as const
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      },
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR'
            }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      ticks: {
        callback: function(value: any) {
          return '₹' + value.toLocaleString('en-IN');
        }
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        padding: 20,
        font: {
          size: 12,
          weight: 'bold' as const
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      },
      callbacks: {
        label: function(context: any) {
          const percentage = Math.round((context.parsed * 100) / context.dataset.data.reduce((a: number, b: number) => a + b, 0));
          return context.label + ': ' + percentage + '%';
        }
      }
    }
  },
  cutout: '70%'
};

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  time: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    items: ['Tomatoes', 'Potatoes', 'Onions'],
    total: 250,
    status: 'pending',
    time: '2025-01-30T07:45:00+05:30'
  },
  {
    id: 'ORD002',
    customer: 'Jane Smith',
    items: ['Carrots', 'Cabbage'],
    total: 180,
    status: 'accepted',
    time: '2025-01-30T07:30:00+05:30'
  },
  {
    id: 'ORD003',
    customer: 'Mike Johnson',
    items: ['Spinach', 'Cucumber', 'Bell Peppers'],
    total: 320,
    status: 'completed',
    time: '2025-01-30T07:15:00+05:30'
  },
  {
    id: 'ORD004',
    customer: 'Priya Patel',
    items: ['Lady Finger', 'Bitter Gourd', 'Green Chili'],
    total: 275,
    status: 'pending',
    time: '2025-01-30T07:40:00+05:30'
  },
  {
    id: 'ORD005',
    customer: 'Raj Kumar',
    items: ['Cauliflower', 'Broccoli', 'Peas'],
    total: 420,
    status: 'accepted',
    time: '2025-01-30T07:25:00+05:30'
  },
  {
    id: 'ORD006',
    customer: 'Sarah Williams',
    items: ['Sweet Potato', 'Ginger', 'Garlic'],
    total: 190,
    status: 'pending',
    time: '2025-01-30T07:35:00+05:30'
  },
  {
    id: 'ORD007',
    customer: 'Amit Shah',
    items: ['Mushrooms', 'Spring Onions', 'Celery'],
    total: 340,
    status: 'completed',
    time: '2025-01-30T07:10:00+05:30'
  },
  {
    id: 'ORD008',
    customer: 'Emily Chen',
    items: ['Baby Corn', 'Zucchini', 'Asparagus'],
    total: 450,
    status: 'accepted',
    time: '2025-01-30T07:20:00+05:30'
  },
  {
    id: 'ORD009',
    customer: 'Mohammed Ali',
    items: ['Eggplant', 'Ridge Gourd', 'Bottle Gourd'],
    total: 280,
    status: 'pending',
    time: '2025-01-30T07:38:00+05:30'
  },
  {
    id: 'ORD010',
    customer: 'Lisa Garcia',
    items: ['Red Capsicum', 'Yellow Capsicum', 'Green Beans'],
    total: 390,
    status: 'completed',
    time: '2025-01-30T07:05:00+05:30'
  }
];

// Veggie emoji mapping
const veggieEmojis: { [key: string]: string } = {
  'Tomatoes': '🍅',
  'Potatoes': '🥔',
  'Onions': '🧅',
  'Carrots': '🥕',
  'Cabbage': '🥬',
  'Spinach': '🥬',
  'Cucumber': '🥒',
  'Bell Peppers': '🫑',
  'Lady Finger': '🌿',
  'Bitter Gourd': '🥬',
  'Green Chili': '🌶',
  'Cauliflower': '🥦',
  'Broccoli': '🥦',
  'Peas': '🫛',
  'Sweet Potato': '🍠',
  'Ginger': '🫚',
  'Garlic': '🧄',
  'Mushrooms': '🍄',
  'Spring Onions': '🌱',
  'Celery': '🥬',
  'Baby Corn': '🌽',
  'Zucchini': '🥒',
  'Asparagus': '🥬',
  'Eggplant': '🍆',
  'Ridge Gourd': '🥒',
  'Bottle Gourd': '🥒',
  'Red Capsicum': '🫑',
  'Yellow Capsicum': '🫑',
  'Green Beans': '🫛'
};

export default function VendorDashboard() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setCurrentLanguage(languageCode);
    toast.success(`Language changed to ${languages.find(lang => lang.code === languageCode)?.name}`);
  };

  const handleOrderAction = (orderId: string, action: 'accept' | 'reject' | 'complete') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const newStatus = action === 'accept' ? 'accepted' 
          : action === 'reject' ? 'rejected' 
          : 'completed';
        return { ...order, status: newStatus };
      }
      return order;
    }));

    const actionText = action === 'accept' ? 'accepted' 
      : action === 'reject' ? 'rejected' 
      : 'completed';
    toast.success(`Order ${orderId} has been ${actionText}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Language Selector */}
      <div className="flex justify-end mb-6">
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <GlobeAltIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {languages.find(lang => lang.code === currentLanguage)?.name}
            </span>
          </button>
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('header.title')}</h1>
          <p className="text-gray-600 mt-1">{t('header.welcome')}</p>
        </div>
        <button
          onClick={() => router.push('/vendor/add-item')}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          {t('actions.addItem')}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCartIcon className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">
              +12.5% from last month
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mt-4">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">156</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyRupeeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">
              +8.2% from last month
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mt-4">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">₹45600</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-red-600 text-sm font-medium">
              -2.3% from last month
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mt-4">Average Order</h3>
          <p className="text-3xl font-bold text-gray-900">₹292</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">
              +4.5% from last month
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mt-4">Active Customers</h3>
          <p className="text-3xl font-bold text-gray-900">89</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('charts.revenueTrend')}</h3>
          <div className="h-[400px]">
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </div>

        {/* Customer Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">{t('charts.customerDistribution')}</h3>
          <div className="h-[400px] flex items-center justify-center">
            <Doughnut data={customerTypeData} options={doughnutOptions} />
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('charts.orderHistory')}</h3>
          <div className="h-[400px]">
            <Bar data={orderData} options={chartOptions} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">{t('stats.quickStats')}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.conversionRate')}</span>
              <span className="font-semibold">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.responseTime')}</span>
              <span className="font-semibold">2.5 {t('stats.hours')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.satisfaction')}</span>
              <span className="font-semibold">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('stats.returnRate')}</span>
              <span className="font-semibold">2.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{t('orders.recentOrders')}</h2>
            <p className="text-sm text-gray-600 mt-1">{t('orders.manageOrders')}</p>
          </div>
          <Link 
            href="/vendor/orders"
            className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            {t('orders.viewAll')}
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-green-100 group relative overflow-hidden"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
              
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg"
                  >
                    {order.customer.charAt(0)}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{order.customer}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DocumentTextIcon className="w-4 h-4" />
                      <span>{t('orders.orderId')}: {order.id}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <ClockIcon className="w-4 h-4" />
                      <span>{new Date(order.time).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">₹{order.total}</p>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {t(`orders.status.${order.status}`)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-2 bg-white rounded-lg shadow-sm flex items-center gap-2 border border-green-100 hover:border-green-300 transition-colors duration-200"
                    >
                      <motion.span 
                        className="text-xl"
                        whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        role="img" 
                        aria-label={item}
                      >
                        {veggieEmojis[item] || '🥬'}
                      </motion.span>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {order.status === 'pending' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOrderAction(order.id, 'reject')}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <XCircleIcon className="w-4 h-4" />
                      {t('orders.reject')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOrderAction(order.id, 'accept')}
                      className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      {t('orders.accept')}
                    </motion.button>
                  </>
                )}
                {order.status === 'accepted' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOrderAction(order.id, 'complete')}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                    {t('orders.markCompleted')}
                  </motion.button>
                )}
                {order.status === 'completed' && (
                  <span className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    {t('orders.completed')}
                  </span>
                )}
                {order.status === 'rejected' && (
                  <span className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
                    <XCircleIcon className="w-4 h-4" />
                    {t('orders.rejected')}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}