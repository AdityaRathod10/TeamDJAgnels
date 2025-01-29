"use client"

import React from "react"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import ProductCard from "./ProductCard"

const ProductShowcase = () => {
  const products = [
    {
      id: "1",
      name: "Guava",
      price: 49,
      originalPrice: 58,
      discount: 15,
      unit: "4 pcs (Approx. 460g)",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/530aaadc-48cf-444b-a122-32b98b5ce1b1/Guava.jpeg",
        nutrition: {
          calories: "68 cal per 100g",
          protein: "2.6g per 100g",
          carbs: "14g per 100g",
          fiber: "5.4g per 100g",
          vitamins: ["Vitamin C", "Vitamin A", "Potassium", "Magnesium"]
        }
    },
    {
      id: "2",
      name: "Paneer",
      price: 46,
      originalPrice: 53,
      discount: 13,
      unit: "100 g",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/05/how-to-make-paneer-recipe.jpg",
        nutrition: {
          calories: "250 cal per 100g",
          protein: "20g per 100g",
          carbs: "4g per 100g",
          fiber: "2.8g per 100g",
          vitamins: ["Folate", "Vitamin C", "Iron", "Potassium"]
        }
    },
    {
      id: "3",
      name: "Onion",
      price: 31,
      originalPrice: 60,
      discount: 48,
      unit: "500 g",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/527914d5-ebcd-4b21-8280-461fbefefa11/Onion.jpeg",
        nutrition: {
          calories: "89 kcal per 100g",
          protein: "1.1g per 100g",
          carbs: "22.8g per 100g",
          fiber: "2.6g per 100g",
          vitamins: ["Vitamin B6", "Vitamin C", "Potassium", "Magnesium"]
        }
        
    },
    {
      id: "4",
      name: "Potato",
      price: 31,
      originalPrice: 60,
      discount: 40,
      unit: "1000 g",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/61f89abd-8579-4cb8-bd8f-e59377fa57ba/Baby-Potato.jpeg",
        nutrition: {
          calories: "30 kcal per 100g",
          protein: "0.6g per 100g",
          carbs: "7.6g per 100g",
          fiber: "0.4g per 100g",
          vitamins: ["Vitamin C", "Vitamin A", "Potassium", "Magnesium"]
        }
    },
    {
      id: "5",
      name: "Fresh Lettuce",
      price: 35,
      originalPrice: 45,
      discount: 22,
      unit: "200 g",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/930e592c-8e2f-45f2-9db7-bcdfd6f80ffb/Lettuce-Romaine-Green.jpeg",
        nutrition: {
          calories: "15 kcal per 100g",
          protein: "1.4g per 100g",
          carbs: "2.9g per 100g",
          fiber: "1.3g per 100g",
          vitamins: ["Vitamin A", "Vitamin K", "Folate", "Iron"]
        }
    },
    {
      id: "6",
      name: "Organic Ginger",
      price: 50,
      originalPrice: 85,
      discount: 41,
      unit: "250 g",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/d04c3d7e-97ce-4b8a-842b-c839ba18b38c/Organic-Ginger.jpeg",
    },
    {
      id: "7",
      name: "Fresh Tomatoes",
      price: 40,
      originalPrice: 55,
      discount: 27,
      unit: "500 g",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/2e065065-c0d0-45a7-847a-4e7a20f29ed2/Tomato-Hybrid.jpeg",
        nutrition: {
          calories: "30 kcal per 100g",
          protein: "0.6g per 100g",
          carbs: "7.6g per 100g",
          fiber: "0.4g per 100g",
          vitamins: ["Vitamin C", "Vitamin A", "Potassium", "Magnesium"]
        }
    },
    {
      id: "8",
      name: "Green Bell Pepper",
      price: 45,
      originalPrice: 60,
      discount: 25,
      unit: "250 g",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/a289edd5-6fde-4a17-b9aa-9ff38e74a76c/Capsicum-Green.jpeg",
        nutrition: {
          calories: "30 kcal per 100g",
          protein: "0.6g per 100g",
          carbs: "7.6g per 100g",
          fiber: "0.4g per 100g",
          vitamins: ["Vitamin C", "Vitamin A", "Potassium", "Magnesium"]
        }
    },
  ]

  return (
    <div className=" py-12 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full" animate={true}>
                <ProductCard {...product} />
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductShowcase