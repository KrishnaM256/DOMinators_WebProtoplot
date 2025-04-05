import React, { useState } from 'react'

const RecipeSearch = () => {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeDetails, setRecipeDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const fetchRecipes = async () => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`
      )
      const data = await res.json()
      setRecipes(data.results)
    } catch (err) {
      console.error('Error fetching recipes:', err)
    }
  }

  const fetchRecipeDetails = async (recipeId) => {
    setLoadingDetails(true)
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`
      )
      const data = await res.json()
      setRecipeDetails(data)
      setSelectedRecipe(recipeId)
    } catch (err) {
      console.error('Error fetching recipe details:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  const closeModal = () => {
    setSelectedRecipe(null)
    setRecipeDetails(null)
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Recipe Finder</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600"
        />
        <button
          onClick={fetchRecipes}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => fetchRecipeDetails(recipe.id)}
          >
            <h2 className="text-xl font-semibold dark:text-white">
              {recipe.title}
            </h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="mt-2 rounded w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
            {loadingDetails ? (
              <div className="p-8 text-center dark:text-white">
                Loading recipe details...
              </div>
            ) : (
              recipeDetails && (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold dark:text-white">
                      {recipeDetails.title}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
                    >
                      ✕
                    </button>
                  </div>

                  <img
                    src={recipeDetails.image}
                    alt={recipeDetails.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        Ingredients
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                        {recipeDetails.extendedIngredients.map((ingredient) => (
                          <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        Instructions
                      </h3>
                      {recipeDetails.instructions ? (
                        <div
                          className="prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: recipeDetails.instructions,
                          }}
                        />
                      ) : (
                        <p className="dark:text-gray-300">
                          No instructions available for this recipe.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      Nutrition Information
                    </h3>
                    <p className="dark:text-gray-300">
                      Ready in: {recipeDetails.readyInMinutes} minutes
                    </p>
                    <p className="dark:text-gray-300">
                      Servings: {recipeDetails.servings}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeSearch
