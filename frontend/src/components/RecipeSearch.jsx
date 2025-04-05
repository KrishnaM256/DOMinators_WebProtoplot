import React, { useState } from 'react';

const RecipeSearch = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const fetchRecipes = async () => {
        try {
            const res = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
            );
            const data = await res.json();
            setRecipes(data.results);
        } catch (err) {
            console.error('Error fetching recipes:', err);
        }
    };

    const fetchRecipeDetails = async (recipeId) => {
        setLoadingDetails(true);
        try {
            const res = await fetch(
                `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
            );
            const data = await res.json();
            setRecipeDetails(data);
            setSelectedRecipe(recipeId);
        } catch (err) {
            console.error('Error fetching recipe details:', err);
        } finally {
            setLoadingDetails(false);
        }
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        setRecipeDetails(null);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Recipe Finder</h1>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button onClick={fetchRecipes} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <div 
                        key={recipe.id} 
                        className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => fetchRecipeDetails(recipe.id)}
                    >
                        <h2 className="text-xl font-semibold">{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} className="mt-2 rounded w-full h-48 object-cover" />
                    </div>
                ))}
            </div>

            {/* Recipe Details Modal */}
            {selectedRecipe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {loadingDetails ? (
                            <div className="p-8 text-center">Loading recipe details...</div>
                        ) : (
                            recipeDetails && (
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-2xl font-bold">{recipeDetails.title}</h2>
                                        <button 
                                            onClick={closeModal}
                                            className="text-gray-500 hover:text-gray-700"
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
                                            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {recipeDetails.extendedIngredients.map((ingredient) => (
                                                    <li key={ingredient.id}>{ingredient.original}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                                            {recipeDetails.instructions ? (
                                                <div 
                                                    className="prose" 
                                                    dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} 
                                                />
                                            ) : (
                                                <p>No instructions available for this recipe.</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t">
                                        <h3 className="text-xl font-semibold mb-2">Nutrition Information</h3>
                                        <p>Ready in: {recipeDetails.readyInMinutes} minutes</p>
                                        <p>Servings: {recipeDetails.servings}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeSearch;