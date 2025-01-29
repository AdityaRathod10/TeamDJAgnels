'use client';

import { useState, useEffect } from 'react';
import { VendorAnalytics, MarketTrend } from '@/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock analytics data
const mockAnalytics: VendorAnalytics = {
  overview: {
    totalRevenue: 125000,
    totalOrders: 450,
    averageOrderValue: 277.78,
    totalCustomers: 280,
    repeatCustomers: 165,
    customerRetentionRate: 58.93
  },
  salesTrends: {
    daily: [
      { date: '2025-01-23', revenue: 4200, orders: 15, averageOrderValue: 280.00 },
      { date: '2025-01-24', revenue: 4500, orders: 16, averageOrderValue: 281.25 },
      { date: '2025-01-25', revenue: 5100, orders: 19, averageOrderValue: 268.42 },
      { date: '2025-01-26', revenue: 4800, orders: 17, averageOrderValue: 282.35 },
      { date: '2025-01-27', revenue: 4300, orders: 15, averageOrderValue: 286.67 },
      { date: '2025-01-28', revenue: 4700, orders: 16, averageOrderValue: 293.75 },
      { date: '2025-01-29', revenue: 4900, orders: 18, averageOrderValue: 272.22 }
    ],
    weekly: [
      { date: '2025-W01', revenue: 29000, orders: 105, averageOrderValue: 276.19 },
      { date: '2025-W02', revenue: 31500, orders: 112, averageOrderValue: 281.25 },
      { date: '2025-W03', revenue: 32000, orders: 115, averageOrderValue: 278.26 },
      { date: '2025-W04', revenue: 33500, orders: 120, averageOrderValue: 279.17 }
    ],
    monthly: [
      { date: '2024-09', revenue: 98000, orders: 350, averageOrderValue: 280.00 },
      { date: '2024-10', revenue: 105000, orders: 380, averageOrderValue: 276.32 },
      { date: '2024-11', revenue: 112000, orders: 400, averageOrderValue: 280.00 },
      { date: '2024-12', revenue: 118000, orders: 425, averageOrderValue: 277.65 },
      { date: '2025-01', revenue: 125000, orders: 450, averageOrderValue: 277.78 }
    ]
  },
  topProducts: [
    {
      vegetableId: '1',
      name: 'Tomatoes',
      totalSales: 850,
      revenue: 25500,
      growth: 15.5,
      category: 'Everyday Essentials'
    },
    {
      vegetableId: '2',
      name: 'Potatoes',
      totalSales: 1200,
      revenue: 24000,
      growth: 8.3,
      category: 'Everyday Essentials'
    },
    {
      vegetableId: '3',
      name: 'Spinach',
      totalSales: 600,
      revenue: 18000,
      growth: 12.1,
      category: 'Leafy Greens'
    },
    {
      vegetableId: '4',
      name: 'Broccoli',
      totalSales: 400,
      revenue: 16000,
      growth: 5.8,
      category: 'Premium Vegetables'
    },
    {
      vegetableId: '5',
      name: 'Bell Peppers',
      totalSales: 350,
      revenue: 14000,
      growth: 7.2,
      category: 'Premium Vegetables'
    },
    {
      vegetableId: '6',
      name: 'Lettuce',
      totalSales: 450,
      revenue: 13500,
      growth: 9.4,
      category: 'Leafy Greens'
    },
    {
      vegetableId: '7',
      name: 'Carrots',
      totalSales: 750,
      revenue: 15000,
      growth: 6.7,
      category: 'Everyday Essentials'
    }
  ],
  customerFeedback: {
    averageRating: 4.5,
    totalReviews: 320,
    sentimentScore: 85,
    recentReviews: [
      {
        id: '1',
        userId: 'user1',
        rating: 5,
        comment: 'Great quality vegetables, always fresh!',
        date: '2025-01-29T10:30:00+05:30',
        vegetableIds: ['1', '2'],
        sentiment: 'positive'
      }
    ]
  },
  inventoryInsights: {
    lowStock: [
      {
        id: '3',
        name: 'Spinach',
        quantity: 5,
        unit: 'kg',
        price: 40
      }
    ],
    overStock: [
      {
        id: '4',
        name: 'Onions',
        quantity: 200,
        unit: 'kg',
        price: 25
      }
    ],
    wastageRate: 3.2,
    restockSuggestions: [
      {
        vegetableId: '3',
        name: 'Spinach',
        currentStock: 5,
        suggestedRestock: 20,
        reason: 'High demand, low stock',
        priority: 'high'
      }
    ]
  }
};

// Mock market trends
const mockMarketTrends: MarketTrend[] = [
  {
    vegetableId: '1',
    name: 'Tomatoes',
    averagePrice: 30,
    priceChange: 2.5,
    demandLevel: 'high',
    seasonality: 'in-season',
    competitorPrices: [
      { vendorId: 'v2', vendorName: 'Fresh Farms', price: 32 },
      { vendorId: 'v3', vendorName: 'Green Market', price: 28 }
    ]
  }
];

export default function VendorDashboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const analytics = mockAnalytics;
  const marketTrends = mockMarketTrends;

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Revenue (₹)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Orders',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const getChartData = () => {
    const data = analytics.salesTrends[timeframe];
    return {
      labels: data.map(d => {
        if (timeframe === 'daily') {
          return new Date(d.date).toLocaleDateString();
        } else if (timeframe === 'weekly') {
          return `Week ${d.date.split('W')[1]}`;
        } else {
          return new Date(d.date).toLocaleString('default', { month: 'short', year: '2-digit' });
        }
      }),
      datasets: [
        {
          label: 'Revenue',
          data: data.map(d => d.revenue),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Orders',
          data: data.map(d => d.orders),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
  };

  const getPieChartData = () => {
    // Calculate revenue by category
    const categoryRevenue = analytics.topProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + product.revenue;
      return acc;
    }, {} as Record<string, number>);

    // Define colors for categories
    const categoryColors = {
      'Everyday Essentials': 'rgba(34, 197, 94, 0.8)',
      'Leafy Greens': 'rgba(59, 130, 246, 0.8)',
      'Premium Vegetables': 'rgba(168, 85, 247, 0.8)'
    };

    return {
      labels: Object.keys(categoryRevenue),
      datasets: [
        {
          data: Object.values(categoryRevenue),
          backgroundColor: Object.keys(categoryRevenue).map(category => 
            categoryColors[category as keyof typeof categoryColors]
          ),
          borderColor: Object.keys(categoryRevenue).map(category => 
            categoryColors[category as keyof typeof categoryColors].replace('0.8', '1')
          ),
          borderWidth: 1
        }
      ]
    };
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Revenue by Category',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Vendor Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">₹{analytics.overview.totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Average Order Value</p>
              <p className="text-xl">₹{analytics.overview.averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Order Statistics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{analytics.overview.totalOrders}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Customers</p>
              <p className="text-xl">{analytics.overview.totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Insights</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Repeat Customers</p>
              <p className="text-2xl font-bold">{analytics.overview.repeatCustomers}</p>
            </div>
            <div>
              <p className="text-gray-600">Retention Rate</p>
              <p className="text-xl">{analytics.overview.customerRetentionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sales Trends</h2>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="h-64">
            <Line options={chartOptions} data={getChartData()} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-64">
            <Pie options={pieChartOptions} data={getPieChartData()} />
          </div>
        </div>
      </div>

      {/* Top Products and Market Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {analytics.topProducts.map(product => (
              <div key={product.vegetableId} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">₹{product.revenue.toLocaleString()} revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.totalSales} units</p>
                  <p className={`text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Market Trends</h2>
          <div className="space-y-4">
            {marketTrends.map(trend => (
              <div key={trend.vegetableId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{trend.name}</p>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    trend.demandLevel === 'high'
                      ? 'bg-green-100 text-green-800'
                      : trend.demandLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {trend.demandLevel.charAt(0).toUpperCase() + trend.demandLevel.slice(1)} Demand
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Market Average: ₹{trend.averagePrice}</span>
                  <span className={trend.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {trend.priceChange >= 0 ? '+' : ''}₹{trend.priceChange}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Competitor Prices:
                  <div className="ml-2 space-y-1">
                    {trend.competitorPrices.map(comp => (
                      <div key={comp.vendorId} className="flex justify-between">
                        <span>{comp.vendorName}</span>
                        <span>₹{comp.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Inventory Alerts</h2>
          <div className="space-y-4">
            {analytics.inventoryInsights.lowStock.length > 0 && (
              <div>
                <h3 className="font-medium text-red-600 mb-2">Low Stock Items</h3>
                {analytics.inventoryInsights.lowStock.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.name}</span>
                    <span>{item.quantity} {item.unit} remaining</span>
                  </div>
                ))}
              </div>
            )}
            {analytics.inventoryInsights.overStock.length > 0 && (
              <div>
                <h3 className="font-medium text-yellow-600 mb-2">Overstock Items</h3>
                {analytics.inventoryInsights.overStock.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.name}</span>
                    <span>{item.quantity} {item.unit} in stock</span>
                  </div>
                ))}
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-600 mb-2">Wastage Rate</h3>
              <p className="text-sm">{analytics.inventoryInsights.wastageRate}% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Restock Suggestions</h2>
          <div className="space-y-4">
            {analytics.inventoryInsights.restockSuggestions.map(suggestion => (
              <div key={suggestion.vegetableId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{suggestion.name}</p>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    suggestion.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : suggestion.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Current Stock: {suggestion.currentStock} units</p>
                  <p>Suggested Restock: {suggestion.suggestedRestock} units</p>
                  <p className="text-xs italic mt-1">{suggestion.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Customer Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600">Average Rating</p>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">{analytics.customerFeedback.averageRating}</span>
              <span className="text-yellow-400 ml-2">★</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              from {analytics.customerFeedback.totalReviews} reviews
            </p>
          </div>
          <div>
            <p className="text-gray-600">Sentiment Score</p>
            <p className="text-2xl font-bold mt-1">{analytics.customerFeedback.sentimentScore}%</p>
            <p className="text-sm text-gray-600 mt-1">positive sentiment</p>
          </div>
          <div>
            <p className="text-gray-600">Recent Reviews</p>
            <div className="mt-2 space-y-2">
              {analytics.customerFeedback.recentReviews.map(review => (
                <div key={review.id} className="text-sm">
                  <div className="flex items-center">
                    <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                    <span className="text-gray-400">{'★'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="mt-1">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
