import VendorInventory from "@/components/VendorInventory"

export default function InventoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Inventory Management</h1>
      <VendorInventory />
    </div>
  )
}

