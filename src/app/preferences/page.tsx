'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Mail,
  Phone,
  Clock,
  MapPin,
  Leaf,
  Filter,
  Heart,
  Wallet,
  ShieldCheck,
  Settings,
  Save,
  AlertCircle
} from 'lucide-react';

interface Preference {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

const notificationPreferences: Preference[] = [
  {
    id: 'email',
    name: 'Email Notifications',
    description: 'Receive order updates and delivery notifications via email',
    enabled: true
  },
  {
    id: 'push',
    name: 'Push Notifications',
    description: 'Get instant updates about your orders on your device',
    enabled: true
  },
  {
    id: 'sms',
    name: 'SMS Alerts',
    description: 'Get text messages for important updates',
    enabled: false
  }
];

const reminderPreferences: Preference[] = [
  {
    id: 'day_before',
    name: '24 Hours Before',
    description: 'Reminder one day before pickup',
    enabled: true
  },
  {
    id: 'hour_before',
    name: '1 Hour Before',
    description: 'Reminder one hour before pickup',
    enabled: true
  },
  {
    id: '30_min',
    name: '30 Minutes Before',
    description: 'Final reminder 30 minutes before pickup',
    enabled: false
  }
];

const dietaryPreferences: DietaryPreference[] = [
  {
    id: 'organic',
    name: 'Organic Only',
    description: 'Prefer organic vegetables when available',
    selected: false
  },
  {
    id: 'local',
    name: 'Local Produce',
    description: 'Prioritize locally grown vegetables',
    selected: true
  },
  {
    id: 'seasonal',
    name: 'Seasonal',
    description: 'Show seasonal vegetables first',
    selected: true
  }
];

export default function Preferences() {
  const [notifications, setNotifications] = useState(notificationPreferences);
  const [reminders, setReminders] = useState(reminderPreferences);
  const [dietary, setDietary] = useState(dietaryPreferences);
  const [maxDistance, setMaxDistance] = useState(5);
  const [defaultPayment, setDefaultPayment] = useState('upi');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const togglePreference = (
    id: string,
    list: Preference[],
    setList: (prefs: Preference[]) => void
  ) => {
    setList(
      list.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const toggleDietary = (id: string) => {
    setDietary(
      dietary.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Preferences</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Customize your shopping experience by setting up your preferences for notifications,
            dietary requirements, and delivery options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              </div>
              <div className="space-y-4">
                {notifications.map((pref) => (
                  <div key={pref.id} className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <button
                        onClick={() => togglePreference(pref.id, notifications, setNotifications)}
                        className={`w-10 h-6 rounded-full transition-colors relative ${
                          pref.enabled ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                            pref.enabled ? 'left-5' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{pref.name}</h3>
                      <p className="text-sm text-gray-500">{pref.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reminder Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>
              </div>
              <div className="space-y-4">
                {reminders.map((pref) => (
                  <div key={pref.id} className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <button
                        onClick={() => togglePreference(pref.id, reminders, setReminders)}
                        className={`w-10 h-6 rounded-full transition-colors relative ${
                          pref.enabled ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                            pref.enabled ? 'left-5' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{pref.name}</h3>
                      <p className="text-sm text-gray-500">{pref.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dietary Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Dietary Preferences</h2>
              </div>
              <div className="space-y-4">
                {dietary.map((pref) => (
                  <div key={pref.id} className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <button
                        onClick={() => toggleDietary(pref.id)}
                        className={`w-10 h-6 rounded-full transition-colors relative ${
                          pref.selected ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                            pref.selected ? 'left-5' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{pref.name}</h3>
                      <p className="text-sm text-gray-500">{pref.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Other Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Other Settings</h2>
              </div>
              
              {/* Maximum Distance */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Maximum Distance (km)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 km</span>
                  <span>{maxDistance} km</span>
                  <span>20 km</span>
                </div>
              </div>

              {/* Default Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Default Payment Method
                </label>
                <select
                  value={defaultPayment}
                  onChange={(e) => setDefaultPayment(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </motion.div>

          {/* Success Message */}
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Preferences saved successfully!
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
