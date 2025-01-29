'use client';

import { useState } from 'react';
import { Booking } from '@/types';

// Mock bookings (replace with API calls later)
const mockBookings: Booking[] = [
  {
    id: '1',
    userId: 'user1',
    vendorId: 'vendor1',
    items: [
      {
        vegetableId: '1',
        name: 'Tomatoes',
        quantity: 2,
        unit: 'kg',
        priceAtBooking: 40
      },
      {
        vegetableId: '2',
        name: 'Potatoes',
        quantity: 3,
        unit: 'kg',
        priceAtBooking: 30
      }
    ],
    status: 'pending',
    totalAmount: 170,
    pickupDate: '2025-01-30',
    pickupTime: '10:00',
    createdAt: '2025-01-29T10:36:14+05:30',
    remindersSent: 1,
    lastReminderSent: '2025-01-29T10:36:14+05:30'
  }
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredBookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Booking #{booking.id}</h2>
                <p className="text-gray-600">
                  Pickup: {new Date(booking.pickupDate).toLocaleDateString()} at {booking.pickupTime}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="border-t border-b py-4 mb-4">
              <h3 className="font-medium mb-2">Items:</h3>
              <div className="space-y-2">
                {booking.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{item.quantity} {item.unit} × ₹{item.priceAtBooking}</span>
                  </div>
                ))}
                <div className="pt-2 border-t mt-2">
                  <span className="font-medium">Total: ₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Booked on: {new Date(booking.createdAt).toLocaleString()}
              </div>
              {booking.status === 'pending' && (
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel Booking
                </button>
              )}
            </div>

            {booking.remindersSent > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                Last reminder sent: {new Date(booking.lastReminderSent!).toLocaleString()}
              </div>
            )}
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}
