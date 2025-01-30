import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function generateRecipes(ingredients) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

  const prompt = `Given the following ingredients: ${ingredients}, suggest 3 recipes that can be made using some or all of these ingredients. For each recipe, provide a name, a list of ingredients (including quantities), and step-by-step instructions. Format the response as a JSON array of recipe objects with the following structure:
  [
    {
      "name": "Recipe Name",
      "ingredients": ["Ingredient 1", "Ingredient 2", ...],
      "instructions": ["Step 1", "Step 2", ...]
    },
    ...
  ]`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log("Raw API response:", text)

    const recipes = JSON.parse(text)
    console.log("Parsed recipes:", recipes)
    return recipes
  } catch (error) {
    console.error("Error generating recipes:", error)
    throw error
  }
}

const ingredients = "Paneer, Onion, Potato, Green Bell Pepper, Fresh Tomatoes"
generateRecipes(ingredients)
  .then((recipes) => console.log("Recipes generated successfully"))
  .catch((error) => console.error("Failed to generate recipes:", error))

