"use client"

import type React from "react"
import { useState } from "react"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { useCart } from "@/context/CartContext"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NutritionalInfo {
  calories: string
  protein: string
  carbs: string
  fiber: string
  vitamins: string[]
}

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  weight: string
  image: string
  nutrition?: NutritionalInfo
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  discount, 
  weight, 
  image,
  nutrition 
}) => {
  const { addToCart, getItemQuantity } = useCart()
  const quantity = getItemQuantity(id)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('button')) {
      setIsModalOpen(true)
    }
  }

  return (
    <BackgroundGradient 
      className="group relative h-[300px] w-full overflow-hidden rounded-xl transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 transition-opacity" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Top content */}
        <div className="flex justify-between">
          {discount && (
            <span className="absolute top-2 right-2 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
              {discount}% Off
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart({ id, name, price, weight, image });
              }}
              className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Plus className="h-5 w-5 text-black" />
            </button>
            {quantity > 0 && (
              <span className="text-black text-sm font-medium bg-black/10 px-2 py-1 rounded-full">
                {quantity}
              </span>
            )}
          </div>
        </div>
        
        {/* Bottom content */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-white/70">{weight}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-white/70 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:p-6 p-4">
          <DialogHeader className="sm:mb-6 mb-4">
            <DialogTitle className="text-xl sm:text-2xl">{name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Product Image */}
            <div className="relative aspect-square w-full max-h-[300px] sm:max-h-[400px]">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Net Qty: {weight}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold">₹{price}</span>
                {originalPrice && (
                  <>
                    <span className="text-gray-500 line-through">₹{originalPrice}</span>
                    <span className="text-green-600 text-sm">{discount}% Off</span>
                  </>
                )}
              </div>

              {/* Nutritional Information */}
              {nutrition && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-base sm:text-lg">Nutritional Information</h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <div className="bg-gray-50 p-2 sm:p-3 rounded">
                      <p className="text-gray-600">Calories</p>
                      <p className="font-medium">{nutrition.calories}</p>
                    </div>
                    <div className="bg-gray-50 p-2 sm:p-3 rounded">
                      <p className="text-gray-600">Protein</p>
                      <p className="font-medium">{nutrition.protein}</p>
                    </div>
                    <div className="bg-gray-50 p-2 sm:p-3 rounded">
                      <p className="text-gray-600">Carbs</p>
                      <p className="font-medium">{nutrition.carbs}</p>
                    </div>
                    <div className="bg-gray-50 p-2 sm:p-3 rounded">
                      <p className="text-gray-600">Fiber</p>
                      <p className="font-medium">{nutrition.fiber}</p>
                    </div>
                  </div>
                  {nutrition.vitamins.length > 0 && (
                    <div className="bg-gray-50 p-2 sm:p-3 rounded">
                      <p className="text-gray-600">Key Vitamins & Minerals</p>
                      <p className="font-medium text-sm">{nutrition.vitamins.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={() => {
                  addToCart({ id, name, price, weight, image });
                  setIsModalOpen(false);
                }}
                className="w-full bg-black text-white rounded-lg py-2.5 sm:py-3 hover:bg-black/90 text-sm sm:text-base mt-2 sm:mt-4"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </BackgroundGradient>
  )
}

export default ProductCard