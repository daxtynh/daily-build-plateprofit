"use client";

import { useState, useEffect } from "react";
import { Ingredient, Recipe, CalculatedRecipe } from "@/lib/types";
import { calculateRecipeCost } from "@/lib/calculations";
import { getIngredients, saveIngredients, getRecipes, saveRecipes } from "@/lib/storage";
import IngredientForm from "@/components/IngredientForm";
import RecipeForm from "@/components/RecipeForm";
import RecipeCard from "@/components/RecipeCard";
import Dashboard from "@/components/Dashboard";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"recipes" | "ingredients">("recipes");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    setIngredients(getIngredients());
    setRecipes(getRecipes());
  }, []);

  const handleAddIngredient = (ingredient: Ingredient) => {
    const updated = [...ingredients, ingredient];
    setIngredients(updated);
    saveIngredients(updated);
    setShowIngredientForm(false);
  };

  const handleDeleteIngredient = (id: string) => {
    const updated = ingredients.filter((i) => i.id !== id);
    setIngredients(updated);
    saveIngredients(updated);
  };

  const handleAddRecipe = (recipe: Recipe) => {
    const updated = [...recipes, recipe];
    setRecipes(updated);
    saveRecipes(updated);
    setShowRecipeForm(false);
  };

  const handleDeleteRecipe = (id: string) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    saveRecipes(updated);
  };

  const handleSubscribe = async () => {
    setIsCheckoutLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType: "monthly" }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const calculatedRecipes: CalculatedRecipe[] = recipes.map((recipe) =>
    calculateRecipeCost(recipe, ingredients)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">PlateProfit</h1>
            </div>
            <button
              onClick={() => setShowPricing(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        {recipes.length === 0 && ingredients.length === 0 && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Know Your Food Costs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Calculate the exact cost of every dish. Set prices that maximize profit.
              Stop guessing and start growing your margins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveTab("ingredients");
                  setShowIngredientForm(true);
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Add Your First Ingredient
              </button>
            </div>
          </div>
        )}

        {/* Dashboard */}
        <Dashboard recipes={calculatedRecipes} />

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("recipes")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "recipes"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Recipes ({recipes.length})
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "ingredients"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Ingredients ({ingredients.length})
          </button>
        </div>

        {/* Recipes Tab */}
        {activeTab === "recipes" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Recipes</h2>
              <button
                onClick={() => setShowRecipeForm(true)}
                disabled={ingredients.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + New Recipe
              </button>
            </div>

            {ingredients.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-yellow-800 text-sm">
                  Add some ingredients first before creating recipes.{" "}
                  <button
                    onClick={() => setActiveTab("ingredients")}
                    className="underline font-medium"
                  >
                    Go to Ingredients
                  </button>
                </p>
              </div>
            )}

            {showRecipeForm && (
              <div className="mb-6">
                <RecipeForm
                  ingredients={ingredients}
                  onAdd={handleAddRecipe}
                  onCancel={() => setShowRecipeForm(false)}
                />
              </div>
            )}

            {calculatedRecipes.length === 0 && !showRecipeForm ? (
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 mb-4">
                  No recipes yet. Create your first recipe to see profit analysis.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {calculatedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    ingredients={ingredients}
                    onDelete={handleDeleteRecipe}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Ingredients
              </h2>
              <button
                onClick={() => setShowIngredientForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                + New Ingredient
              </button>
            </div>

            {showIngredientForm && (
              <div className="mb-6">
                <IngredientForm
                  onAdd={handleAddIngredient}
                  onCancel={() => setShowIngredientForm(false)}
                />
              </div>
            )}

            {ingredients.length === 0 && !showIngredientForm ? (
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 mb-4">
                  No ingredients yet. Add your first ingredient with its cost per unit.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                        Ingredient
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                        Cost
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                        Unit
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ingredients.map((ing) => (
                      <tr key={ing.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{ing.name}</td>
                        <td className="px-4 py-3 text-gray-900">
                          ${ing.costPerUnit.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{ing.unit}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteIngredient(ing.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Pricing Modal */}
        {showPricing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="relative max-w-lg w-full">
              <button
                onClick={() => setShowPricing(false)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <PricingSection
                onSubscribe={handleSubscribe}
                isLoading={isCheckoutLoading}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-gray-600 text-sm">
                PlateProfit - Know Your Food Costs
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Built for restaurants, food trucks, and bakeries
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
