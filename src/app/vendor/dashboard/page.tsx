'use client';

import { useState } from 'react';
import { VegetableItem, VendorStats } from '@/types';

// Mock data (replace with API calls later)
const mockStats: VendorStats = {
  totalSales: 1250,
  averageRating: 4.5,
  totalProducts: 15,
  viewsToday: 45,
  priceUpdatesToday: 3
};

const mockVegetables: VegetableItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    price: 40,
    unit: 'kg',
    quantity: 100,
    quality: 5,
    lastUpdated: '2025-01-29T10:36:14+05:30',
    inStock: true,
    category: 'Vegetables',
    description: 'Fresh, ripe tomatoes'
  },
  // Add more mock vegetables...
];

export default function VendorDashboard() {
  const [vegetables, setVegetables] = useState<VegetableItem[]>(mockVegetables);
  const [stats, setStats] = useState<VendorStats>(mockStats);
  const [newVegetable, setNewVegetable] = useState<Partial<VegetableItem>>({
    name: '',
    price: 0,
    unit: 'kg',
    quantity: 0,
    quality: 5,
    inStock: true
  });

  const updatePrice = (id: string, newPrice: number) => {
    setVegetables(vegetables.map(veg => {
      if (veg.id === id) {
        return {
          ...veg,
          price: newPrice,
          lastUpdated: new Date().toISOString(),
          priceHistory: [
            ...(veg.priceHistory || []),
            { price: veg.price, date: new Date().toISOString() }
          ]
        };
      }
      return veg;
    }));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setVegetables(vegetables.map(veg => {
      if (veg.id === id) {
        return {
          ...veg,
          quantity: newQuantity,
          inStock: newQuantity > 0
        };
      }
      return veg;
    }));
  };

  const addNewVegetable = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (vegetables.length + 1).toString();
    setVegetables([
      ...vegetables,
      {
        ...newVegetable as VegetableItem,
        id: newId,
        lastUpdated: new Date().toISOString(),
        inStock: true
      }
    ]);
    setNewVegetable({
      name: '',
      price: 0,
      unit: 'kg',
      quantity: 0,
      quality: 5,
      inStock: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Vendor Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Sales" value={`₹${stats.totalSales}`} />
        <StatCard title="Average Rating" value={`${stats.averageRating}★`} />
        <StatCard title="Total Products" value={stats.totalProducts.toString()} />
        <StatCard title="Views Today" value={stats.viewsToday.toString()} />
        <StatCard title="Price Updates" value={stats.priceUpdatesToday.toString()} />
      </div>

      {/* Add New Vegetable Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Vegetable</h2>
        <form onSubmit={addNewVegetable} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Vegetable Name"
            className="px-4 py-2 border rounded-lg"
            value={newVegetable.name}
            onChange={e => setNewVegetable({ ...newVegetable, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="px-4 py-2 border rounded-lg"
            value={newVegetable.price}
            onChange={e => setNewVegetable({ ...newVegetable, price: Number(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            className="px-4 py-2 border rounded-lg"
            value={newVegetable.quantity}
            onChange={e => setNewVegetable({ ...newVegetable, quantity: Number(e.target.value) })}
            required
          />
          <button
            type="submit"
            className="md:col-span-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Vegetable
          </button>
        </form>
      </div>

      {/* Inventory Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Price (₹)</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Last Updated</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vegetables.map(veg => (
                <tr key={veg.id} className="border-b">
                  <td className="py-2">{veg.name}</td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={veg.price}
                      onChange={e => updatePrice(veg.id, Number(e.target.value))}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={veg.quantity}
                      onChange={e => updateQuantity(veg.id, Number(e.target.value))}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      veg.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {veg.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-2 text-sm text-gray-600">
                    {new Date(veg.lastUpdated).toLocaleString()}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => setVegetables(vegetables.filter(v => v.id !== veg.id))}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
