'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Vegetable {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  organic: boolean;
}

// Mock data - replace with actual data from your backend
const mockVegetables: Vegetable[] = [
  {
    id: '1',
    name: 'Tomatoes',
    price: 40,
    unit: 'kg',
    stock: 100,
    category: 'everyday',
    organic: false,
  },
  {
    id: '2',
    name: 'Organic Spinach',
    price: 30,
    unit: 'bunch',
    stock: 50,
    category: 'leafy',
    organic: true,
  },
];

export default function VendorInventory() {
  const { t } = useLanguage();
  const [vegetables, setVegetables] = useState<Vegetable[]>(mockVegetables);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Vegetable>>({
    name: '',
    price: 0,
    unit: 'kg',
    stock: 0,
    category: 'everyday',
    organic: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.type === 'number' 
        ? parseFloat(e.target.value) 
        : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setVegetables(vegetables.map(veg => 
        veg.id === editingId 
          ? { ...veg, ...formData }
          : veg
      ));
      setEditingId(null);
    } else {
      const newVegetable: Vegetable = {
        id: Date.now().toString(),
        ...formData as Omit<Vegetable, 'id'>,
      };
      setVegetables([...vegetables, newVegetable]);
    }
    setFormData({
      name: '',
      price: 0,
      unit: 'kg',
      stock: 0,
      category: 'everyday',
      organic: false,
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setVegetables(vegetables.filter(veg => veg.id !== id));
  };

  const handleEdit = (vegetable: Vegetable) => {
    setFormData(vegetable);
    setEditingId(vegetable.id);
    setShowAddForm(true);
  };

  const handleStockUpdate = (id: string, newStock: number) => {
    setVegetables(vegetables.map(veg =>
      veg.id === id
        ? { ...veg, stock: Math.max(0, newStock) }
        : veg
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('inventory.title')}</h1>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
            setFormData({
              name: '',
              price: 0,
              unit: 'kg',
              stock: 0,
              category: 'everyday',
              organic: false,
            });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {t('inventory.addVegetable')}
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? t('inventory.editVegetable') : t('inventory.addVegetable')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('inventory.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.price')}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.unit')}
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="kg">kg</option>
                    <option value="bunch">bunch</option>
                    <option value="piece">piece</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('inventory.stock')}
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('inventory.category')}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="everyday">{t('inventory.categories.everyday')}</option>
                  <option value="leafy">{t('inventory.categories.leafy')}</option>
                  <option value="exotic">{t('inventory.categories.exotic')}</option>
                  <option value="seasonal">{t('inventory.categories.seasonal')}</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  {t('inventory.organic')}
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  {editingId ? t('common.save') : t('common.add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('inventory.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('inventory.price')} / {t('inventory.unit')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('inventory.stock')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('inventory.category')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('inventory.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vegetables.map((vegetable) => (
              <tr key={vegetable.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {vegetable.name}
                        {vegetable.organic && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {t('inventory.organicBadge')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₹{vegetable.price}/{vegetable.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStockUpdate(vegetable.id, vegetable.stock - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-900">{vegetable.stock}</span>
                    <button
                      onClick={() => handleStockUpdate(vegetable.id, vegetable.stock + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {t(`inventory.categories.${vegetable.category}`)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(vegetable)}
                    className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    {t('common.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(vegetable.id)}
                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    {t('common.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
