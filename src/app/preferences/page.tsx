'use client';

import { useState } from 'react';
import { UserPreferences } from '@/types';

const dietaryOptions = ['Vegetarian', 'Vegan', 'Low-Carb', 'Keto', 'Diabetic-Friendly'];
const healthConditions = ['Diabetes', 'Hypertension', 'Heart Disease', 'Anemia', 'None'];
const commonVegetables = [
  'Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Spinach',
  'Cauliflower', 'Broccoli', 'Bell Peppers', 'Cucumber', 'Beans'
];

export default function Preferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    id: '1',
    userId: 'user1',
    dietaryPreferences: [],
    healthConditions: [],
    allergies: [],
    favoriteVegetables: [],
    dislikedVegetables: [],
    preferredMarkets: [],
    budgetRange: {
      min: 0,
      max: 1000
    },
    cookingFrequency: 'daily',
    householdSize: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving preferences:', preferences);
    // Here you would typically send this to your API
    alert('Preferences saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Preferences</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        {/* Dietary Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dietary Preferences</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryOptions.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.dietaryPreferences.includes(option)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...preferences.dietaryPreferences, option]
                      : preferences.dietaryPreferences.filter(item => item !== option);
                    setPreferences({ ...preferences, dietaryPreferences: updated });
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Health Conditions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Health Conditions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {healthConditions.map(condition => (
              <label key={condition} className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.healthConditions.includes(condition)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...preferences.healthConditions, condition]
                      : preferences.healthConditions.filter(item => item !== condition);
                    setPreferences({ ...preferences, healthConditions: updated });
                  }}
                  className="mr-2"
                />
                {condition}
              </label>
            ))}
          </div>
        </div>

        {/* Vegetable Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Vegetable Preferences</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Favorites */}
            <div>
              <h3 className="font-medium mb-2">Favorite Vegetables</h3>
              <div className="space-y-2">
                {commonVegetables.map(vegetable => (
                  <label key={vegetable} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.favoriteVegetables.includes(vegetable)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...preferences.favoriteVegetables, vegetable]
                          : preferences.favoriteVegetables.filter(item => item !== vegetable);
                        setPreferences({ ...preferences, favoriteVegetables: updated });
                      }}
                      className="mr-2"
                    />
                    {vegetable}
                  </label>
                ))}
              </div>
            </div>

            {/* Dislikes */}
            <div>
              <h3 className="font-medium mb-2">Disliked Vegetables</h3>
              <div className="space-y-2">
                {commonVegetables.map(vegetable => (
                  <label key={vegetable} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.dislikedVegetables.includes(vegetable)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...preferences.dislikedVegetables, vegetable]
                          : preferences.dislikedVegetables.filter(item => item !== vegetable);
                        setPreferences({ ...preferences, dislikedVegetables: updated });
                      }}
                      className="mr-2"
                    />
                    {vegetable}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Budget and Household */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shopping Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Budget Range (₹)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={preferences.budgetRange.min}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    budgetRange: { ...preferences.budgetRange, min: Number(e.target.value) }
                  })}
                  className="w-32 px-3 py-2 border rounded-lg"
                  placeholder="Min"
                />
                <span>to</span>
                <input
                  type="number"
                  value={preferences.budgetRange.max}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    budgetRange: { ...preferences.budgetRange, max: Number(e.target.value) }
                  })}
                  className="w-32 px-3 py-2 border rounded-lg"
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cooking Frequency
              </label>
              <select
                value={preferences.cookingFrequency}
                onChange={(e) => setPreferences({
                  ...preferences,
                  cookingFrequency: e.target.value as UserPreferences['cookingFrequency']
                })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="occasionally">Occasionally</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Household Size
              </label>
              <input
                type="number"
                value={preferences.householdSize}
                onChange={(e) => setPreferences({
                  ...preferences,
                  householdSize: Number(e.target.value)
                })}
                min="1"
                className="w-32 px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}
