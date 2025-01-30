'use client';

import { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  MinusCircle,
  PlusCircle
} from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  description: string;
  lastUpdated: string;
}

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 40,
    stock: 50,
    unit: 'kg',
    image: '/vegetables/tomatoes.jpg',
    status: 'in-stock',
    description: 'Fresh, ripe tomatoes from local farms',
    lastUpdated: '2025-01-29T10:00:00+05:30'
  },
  {
    id: 'P002',
    name: 'Organic Potatoes',
    category: 'Root Vegetables',
    price: 30,
    stock: 8,
    unit: 'kg',
    image: '/vegetables/potatoes.jpg',
    status: 'low-stock',
    description: 'Organically grown potatoes',
    lastUpdated: '2025-01-29T09:30:00+05:30'
  },
  {
    id: 'P003',
    name: 'Green Spinach',
    category: 'Leafy Greens',
    price: 25,
    stock: 0,
    unit: 'bundle',
    image: '/vegetables/spinach.jpg',
    status: 'out-of-stock',
    description: 'Fresh, crisp spinach leaves',
    lastUpdated: '2025-01-29T08:45:00+05:30'
  }
];

const categories = [
  'All',
  'Vegetables',
  'Root Vegetables',
  'Leafy Greens',
  'Fruits',
  'Herbs'
];

const units = ['kg', 'bundle', 'piece', 'dozen'];

export default function VendorInventory() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Vegetables',
    price: 0,
    stock: 0,
    unit: 'kg',
    description: '',
    image: '/vegetables/default.jpg',
  });

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return 'text-green-600 bg-green-50';
      case 'low-stock':
        return 'text-yellow-600 bg-yellow-50';
      case 'out-of-stock':
        return 'text-red-600 bg-red-50';
    }
  };

  const getStatusIcon = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'low-stock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'out-of-stock':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const calculateStatus = (stock: number): Product['status'] => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 10) return 'low-stock';
    return 'in-stock';
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: `P${Date.now()}`,
      ...newProduct as Omit<Product, 'id' | 'status' | 'lastUpdated'>,
      status: calculateStatus(newProduct.stock || 0),
      lastUpdated: new Date().toISOString(),
    };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({
      name: '',
      category: 'Vegetables',
      price: 0,
      stock: 0,
      unit: 'kg',
      description: '',
      image: '/vegetables/default.jpg',
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    const updatedProducts = products.map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...editingProduct,
          status: calculateStatus(editingProduct.stock),
          lastUpdated: new Date().toISOString(),
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    setEditingProduct(null);
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleStockUpdate = (id: string, change: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + change);
        return {
          ...p,
          stock: newStock,
          status: calculateStatus(newStock),
          lastUpdated: new Date().toISOString(),
        };
      }
      return p;
    }));
  };

  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || p.category === selectedCategory)
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const order = sortOrder === 'asc' ? 1 : -1;
      return typeof aValue === 'string' 
        ? aValue.localeCompare(bValue as string) * order
        : ((aValue as number) - (bValue as number)) * order;
    });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Inventory Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center text-base font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          <select
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <select
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-') as ['name' | 'price' | 'stock', 'asc' | 'desc'];
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
            >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
            <option value="stock-asc">Stock (Low-High)</option>
            <option value="stock-desc">Stock (High-Low)</option>
            </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-base text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-base font-medium text-gray-900">₹{product.price}/{product.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleStockUpdate(product.id, -1)}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-full"
                    >
                      <MinusCircle className="h-6 w-6" />
                    </button>
                    <span className="text-base font-medium text-gray-900 min-w-[2rem] text-center">{product.stock}</span>
                    <button
                      onClick={() => handleStockUpdate(product.id, 1)}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-full"
                    >
                      <PlusCircle className="h-6 w-6" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                    {getStatusIcon(product.status)}
                    <span className="ml-2 capitalize">{product.status.replace('-', ' ')}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium space-x-3">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowAddModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-2 rounded-lg inline-flex items-center"
                  >
                    <Edit2 className="h-5 w-5" />
                    <span className="ml-1">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg inline-flex items-center"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="ml-1">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              editingProduct ? handleEditProduct() : handleAddProduct();
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Name</label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) => editingProduct 
                    ? setEditingProduct({...editingProduct, name: e.target.value})
                    : setNewProduct({...newProduct, name: e.target.value})
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                <select
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({...editingProduct, category: e.target.value})
                    : setNewProduct({...newProduct, category: e.target.value})
                  }
                >
                  {categories.filter(c => c !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})
                      : setNewProduct({...newProduct, price: parseFloat(e.target.value)})
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Unit</label>
                  <select
                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    value={editingProduct ? editingProduct.unit : newProduct.unit}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({...editingProduct, unit: e.target.value})
                      : setNewProduct({...newProduct, unit: e.target.value})
                    }
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Stock</label>
                <input
                  type="number"
                  min="0"
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={editingProduct ? editingProduct.stock : newProduct.stock}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})
                    : setNewProduct({...newProduct, stock: parseInt(e.target.value)})
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={editingProduct ? editingProduct.description : newProduct.description}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({...editingProduct, description: e.target.value})
                    : setNewProduct({...newProduct, description: e.target.value})
                  }
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}