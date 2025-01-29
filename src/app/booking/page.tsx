'use client';

import { useState } from 'react';
import { Booking, BookingItem, VegetableItem, Vendor } from '@/types';

// Mock data (replace with API calls later)
const mockVendor: Vendor = {
  id: '1',
  name: 'Fresh Farms',
  marketName: 'Central Market',
  location: 'Downtown',
  rating: 4.5,
  distance: 1.2,
  vegetables: [
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
    {
      id: '2',
      name: 'Potatoes',
      price: 30,
      unit: 'kg',
      quantity: 150,
      quality: 4,
      lastUpdated: '2025-01-29T10:36:14+05:30',
      inStock: true
    }
  ]
};

export default function Booking() {
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([]);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderSettings, setReminderSettings] = useState({
    email: true,
    push: true,
    dayBefore: true,
    hourBefore: true,
    thirtyMinutes: false
  });

  const addToBooking = (vegetable: VegetableItem) => {
    const existingItem = selectedItems.find(item => item.vegetableId === vegetable.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.vegetableId === vegetable.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedItems([...selectedItems, {
        vegetableId: vegetable.id,
        name: vegetable.name,
        quantity: 1,
        unit: vegetable.unit,
        priceAtBooking: vegetable.price
      }]);
    }
  };

  const updateQuantity = (vegetableId: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedItems(selectedItems.filter(item => item.vegetableId !== vegetableId));
    } else {
      setSelectedItems(selectedItems.map(item =>
        item.vegetableId === vegetableId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.priceAtBooking * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user1', // Replace with actual user ID
      vendorId: mockVendor.id,
      items: selectedItems,
      status: 'pending',
      totalAmount: calculateTotal(),
      pickupDate,
      pickupTime,
      createdAt: new Date().toISOString(),
      notes,
      remindersSent: 0
    };
    
    console.log('Booking created:', booking);
    // Here you would typically send this to your API
    alert('Booking created successfully!');
  };

  // Calculate minimum date (today) and maximum date (7 days from now)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pre-book Your Vegetables</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Vendor Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{mockVendor.name}</h2>
          <p className="text-gray-600 mb-2">{mockVendor.marketName}</p>
          <p className="text-gray-600 mb-4">{mockVendor.location}</p>
          
          <h3 className="font-medium mb-2">Available Items:</h3>
          <div className="space-y-2">
            {mockVendor.vegetables.map(vegetable => (
              <div key={vegetable.id} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{vegetable.name}</span>
                  <span className="text-gray-600 ml-2">₹{vegetable.price}/{vegetable.unit}</span>
                </div>
                <button
                  onClick={() => addToBooking(vegetable)}
                  className="text-green-600 hover:text-green-700"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Selected Items:</h3>
              {selectedItems.length > 0 ? (
                <div className="space-y-2">
                  {selectedItems.map(item => (
                    <div key={item.vegetableId} className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.vegetableId, Number(e.target.value))}
                          min="0"
                          className="w-16 px-2 py-1 border rounded"
                        />
                        <span>{item.unit}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <span className="font-medium">Total: ₹{calculateTotal()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No items selected</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={today}
                max={maxDateStr}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                placeholder="Any special instructions..."
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Reminder Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminderSettings.email}
                    onChange={(e) => setReminderSettings({
                      ...reminderSettings,
                      email: e.target.checked
                    })}
                    className="mr-2"
                  />
                  Email reminders
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminderSettings.push}
                    onChange={(e) => setReminderSettings({
                      ...reminderSettings,
                      push: e.target.checked
                    })}
                    className="mr-2"
                  />
                  Push notifications
                </label>
                <div className="pl-6 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reminderSettings.dayBefore}
                      onChange={(e) => setReminderSettings({
                        ...reminderSettings,
                        dayBefore: e.target.checked
                      })}
                      className="mr-2"
                    />
                    1 day before
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reminderSettings.hourBefore}
                      onChange={(e) => setReminderSettings({
                        ...reminderSettings,
                        hourBefore: e.target.checked
                      })}
                      className="mr-2"
                    />
                    1 hour before
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reminderSettings.thirtyMinutes}
                      onChange={(e) => setReminderSettings({
                        ...reminderSettings,
                        thirtyMinutes: e.target.checked
                      })}
                      className="mr-2"
                    />
                    30 minutes before
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={selectedItems.length === 0}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
