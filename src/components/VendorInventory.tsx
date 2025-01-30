"use client"

import { useState } from "react"
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Vegetable {
  id: string
  name: string
  price: number
  unit: string
  stock: number
  category: string
  organic: boolean
}

const mockVegetables: Vegetable[] = [
  {
    id: "1",
    name: "Tomatoes",
    price: 40,
    unit: "kg",
    stock: 100,
    category: "everyday",
    organic: false,
  },
  {
    id: "2",
    name: "Organic Spinach",
    price: 30,
    unit: "bunch",
    stock: 50,
    category: "leafy",
    organic: true,
  },
]

export default function VendorInventory() {
  const [vegetables, setVegetables] = useState<Vegetable[]>(mockVegetables)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Vegetable>({
    id: "",
    name: "",
    price: 0,
    unit: "kg",
    stock: 0,
    category: "everyday",
    organic: false,
  })

  const userPhoneNumber = "+919322746054"

  const sendSMS = async (message: string) => {
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: userPhoneNumber, body: message }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Failed to send SMS")
      console.log("SMS sent successfully:", data)
      alert("SMS sent successfully")
    } catch (error) {
      console.error("Error sending SMS:", error)
      alert("Failed to send SMS. Please check the console for more details.")
    }
  }

  const updateVegetable = (id: string, updatedData: Partial<Vegetable>) => {
    setVegetables((prev) => prev.map((veg) => (veg.id === id ? { ...veg, ...updatedData } : veg)))
  }

  const handleStockUpdate = (id: string, newStock: number) => {
    const vegetable = vegetables.find((veg) => veg.id === id)
    if (!vegetable) return

    if (vegetable.stock > 0 && newStock === 0) {
      sendSMS(`${vegetable.name} is now out of stock.`)
    } else if (vegetable.stock === 0 && newStock > 0) {
      sendSMS(`${vegetable.name} is back in stock.`)
    }

    updateVegetable(id, { stock: Math.max(0, newStock) })
  }

  const handlePriceUpdate = (id: string, newPrice: number) => {
    const vegetable = vegetables.find((veg) => veg.id === id)
    if (!vegetable) return

    if (newPrice < vegetable.price) {
      sendSMS(`The price of ${vegetable.name} has decreased to ₹${newPrice}/${vegetable.unit}.`)
    }

    updateVegetable(id, { price: newPrice })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, organic: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateVegetable(editingId, formData)
      setEditingId(null)
    } else {
      setVegetables([...vegetables, { ...formData, id: Date.now().toString() }])
    }
    setFormData({
      id: "",
      name: "",
      price: 0,
      unit: "kg",
      stock: 0,
      category: "everyday",
      organic: false,
    })
    setShowAddForm(false)
  }

  const handleDelete = (id: string) => {
    setVegetables((prev) => prev.filter((veg) => veg.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Inventory</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Vegetable
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Vegetable Name"
              required
            />
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
            />
            <Select name="unit" value={formData.unit} onValueChange={(value) => setFormData((prev) => ({ ...prev, unit: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="bunch">bunch</SelectItem>
                <SelectItem value="piece">piece</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              required
            />
            <Select name="category" value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyday">Everyday</SelectItem>
                <SelectItem value="leafy">Leafy</SelectItem>
                <SelectItem value="exotic">Exotic</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Checkbox
                id="organic"
                checked={formData.organic}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="organic" className="ml-2">
                Organic
              </label>
            </div>
          </div>
          <Button type="submit" className="mt-4">
            {editingId ? "Update Vegetable" : "Add Vegetable"}
          </Button>
        </form>
      )}

      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map((vegetable) => (
            <tr key={vegetable.id}>
              <td className="p-2">{vegetable.name}</td>
              <td className="p-2">
                <Input
                  type="number"
                  value={vegetable.price}
                  onChange={(e) => handlePriceUpdate(vegetable.id, parseFloat(e.target.value))}
                  className="w-20 inline-block"
                />
                /{vegetable.unit}
              </td>
              <td className="p-2">
                <Button onClick={() => handleStockUpdate(vegetable.id, vegetable.stock - 1)} variant="outline" size="sm">
                  -
                </Button>
                <span className="mx-2">{vegetable.stock}</span>
                <Button onClick={() => handleStockUpdate(vegetable.id, vegetable.stock + 1)} variant="outline" size="sm">
                  +
                </Button>
              </td>
              <td className="p-2">
                <Button onClick={() => handleDelete(vegetable.id)} variant="destructive" size="sm">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
