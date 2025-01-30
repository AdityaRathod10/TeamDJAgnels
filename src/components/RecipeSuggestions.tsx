import React, { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, AlertCircle, ChefHat, Clock, ListOrdered, UtensilsCrossed } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Recipe {
  name: string
  ingredients: string[]
  instructions: string[]
}

// Function to get a random food-related image
const getRecipeImage = (recipeName: string) => {
  const foodImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
  ]
  // Use recipe name as a seed to consistently get the same image for the same recipe
  const index = recipeName.length % foodImages.length
  return foodImages[index]
}

export default function RecipeSuggestions() {
  const { cart } = useCart()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null)

  const getRecipeSuggestions = async () => {
    setLoading(true)
    setError(null)
    setRecipes([])

    const ingredients = cart.map((item) => item.name).join(", ")
    console.log("Sending ingredients:", ingredients)

    try {
      const response = await fetch("/api/recipe-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch recipe suggestions")
      }

      if (Array.isArray(data.recipes) && data.recipes.length > 0) {
        setRecipes(data.recipes)
      } else {
        setError("No recipes found for the given ingredients. Try adding more items to your cart.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      console.error("Error fetching recipe suggestions:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8" />
          Recipe Suggestions
        </h2>
        <Button 
          onClick={getRecipeSuggestions} 
          disabled={loading || cart.length === 0}
          className="bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Recipes...
            </>
          ) : (
            "Get Recipe Ideas"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recipes.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <Card 
              key={index}
              className="overflow-hidden bg-white dark:bg-gray-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <img
                  src={getRecipeImage(recipe.name)}
                  alt={recipe.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/800x600/orange/white?text=Recipe+Image"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">
                  {recipe.name}
                </h3>
              </div>

              {/* Content Section */}
              <div className="p-6" onClick={() => setExpandedRecipe(expandedRecipe === index ? null : index)}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Click for instructions</span>
                  </div>
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <ListOrdered className="h-4 w-4" />
                      Ingredients
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-sm">{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`
                    transition-all duration-300 
                    ${expandedRecipe === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
                  `}>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <ChefHat className="h-4 w-4" />
                      Instructions
                    </h4>
                    <ol className="space-y-2 text-gray-600 dark:text-gray-400">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="font-medium">{i + 1}.</span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}