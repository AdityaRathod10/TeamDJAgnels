import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json()
    console.log("Received ingredients:", ingredients)

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json({ error: "No ingredients provided" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Modified prompt to encourage more structured output
    const prompt = `Create 3 recipes using some or all of these ingredients: ${ingredients}. 
    Format your response EXACTLY as follows for each recipe:

    Recipe:
    Name: [Recipe Name]
    Ingredients:
    - [Ingredient 1 with quantity]
    - [Ingredient 2 with quantity]
    Instructions:
    1. [First step]
    2. [Second step]

    Use this exact format for each recipe, separated by blank lines.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log("Raw API response:", text)

    // Try to parse the formatted text response
    const recipes = parseRecipeResponse(text)

    if (recipes.length === 0) {
      return NextResponse.json({ error: "No valid recipes found in the response" }, { status: 500 })
    }

    console.log("Parsed recipes:", recipes)
    return NextResponse.json({ recipes })
  } catch (error) {
    console.error("Error in recipe suggestions:", error)
    return NextResponse.json(
      {
        error: "Failed to generate recipe suggestions",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

function parseRecipeResponse(text: string) {
  const recipes = []
  // Split the text into individual recipes
  const recipeBlocks = text.split(/(?=Recipe:)/).filter(block => block.trim())

  for (const block of recipeBlocks) {
    try {
      const name = block.match(/Name:\s*([^\n]+)/)?.[1]?.trim()
      
      // Extract ingredients
      const ingredientsMatch = block.match(/Ingredients:([\s\S]*?)(?=Instructions:|$)/)
      const ingredients = ingredientsMatch?.[1]
        ?.split('\n')
        .map(line => line.trim())
        .filter(line => line && line.startsWith('-'))
        .map(line => line.substring(1).trim()) || []

      // Extract instructions
      const instructionsMatch = block.match(/Instructions:([\s\S]*?)(?=Recipe:|$)/)
      const instructions = instructionsMatch?.[1]
        ?.split('\n')
        .map(line => line.trim())
        .filter(line => line && /^\d+\./.test(line))
        .map(line => line.replace(/^\d+\.\s*/, '').trim()) || []

      if (name && ingredients.length > 0 && instructions.length > 0) {
        recipes.push({ name, ingredients, instructions })
      }
    } catch (error) {
      console.error("Error parsing recipe block:", error)
      continue
    }
  }

  return recipes
}