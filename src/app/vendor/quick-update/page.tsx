'use client';

import { useState } from 'react';
import { VegetableItem } from '@/types';

const mockVegetables: VegetableItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    price: 40,
    unit: 'kg',
    quantity: 100,
    quality: 5,
    lastUpdated: '2025-01-29T10:36:14+05:30',
    inStock: true
  },
  // Add more vegetables...
];

export default function QuickUpdate() {
  const [vegetables, setVegetables] = useState<VegetableItem[]>(mockVegetables);
  const [selectedVegetable, setSelectedVegetable] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [updateHistory, setUpdateHistory] = useState<Array<{
    vegetableId: string;
    name: string;
    oldPrice: number;
    newPrice: number;
    timestamp: string;
  }>>([]);

  const handleQuickUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const vegetable = vegetables.find(v => v.id === selectedVegetable);
    if (!vegetable) return;

    // Record the update in history
    setUpdateHistory([
      {
        vegetableId: vegetable.id,
        name: vegetable.name,
        oldPrice: vegetable.price,
        newPrice,
        timestamp: new Date().toISOString()
      },
      ...updateHistory
    ]);

    // Update the vegetable price
    setVegetables(vegetables.map(veg => {
      if (veg.id === selectedVegetable) {
        return {
          ...veg,
          price: newPrice,
          lastUpdated: new Date().toISOString()
        };
      }
      return veg;
    }));

    // Reset form
    setSelectedVegetable('');
    setNewPrice(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Quick Price Update</h1>

      {/* Quick Update Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleQuickUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Vegetable
            </label>
            <select
              value={selectedVegetable}
              onChange={(e) => {
                setSelectedVegetable(e.target.value);
                const veg = vegetables.find(v => v.id === e.target.value);
                if (veg) setNewPrice(veg.price);
              }}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select a vegetable</option>
              {vegetables.map(veg => (
                <option key={veg.id} value={veg.id}>
                  {veg.name} (Current: ₹{veg.price}/{veg.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Price (₹)
            </label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              min="0"
              step="0.5"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Update Price
          </button>
        </form>
      </div>

      {/* Update History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <div className="space-y-4">
          {updateHistory.map((update, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{update.name}</h3>
                <p className="text-sm text-gray-600">
                  Price changed from ₹{update.oldPrice} to ₹{update.newPrice}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(update.timestamp).toLocaleString()}
              </span>
            </div>
          ))}

          {updateHistory.length === 0 && (
            <p className="text-center text-gray-500">No recent updates</p>
          )}
        </div>
      </div>
    </div>
  );
}
