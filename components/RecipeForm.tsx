"use client";

import { useState } from "react";
import { Ingredient, Recipe, RecipeIngredient } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  ingredients: Ingredient[];
  onAdd: (recipe: Recipe) => void;
  onCancel: () => void;
}

export default function RecipeForm({ ingredients, onAdd, onCancel }: Props) {
  const [name, setName] = useState("");
  const [servings, setServings] = useState("1");
  const [sellingPrice, setSellingPrice] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddIngredient = () => {
    if (!selectedIngredient || !quantity) return;

    const existing = recipeIngredients.find(
      (ri) => ri.ingredientId === selectedIngredient
    );

    if (existing) {
      setRecipeIngredients(
        recipeIngredients.map((ri) =>
          ri.ingredientId === selectedIngredient
            ? { ...ri, quantity: ri.quantity + parseFloat(quantity) }
            : ri
        )
      );
    } else {
      setRecipeIngredients([
        ...recipeIngredients,
        { ingredientId: selectedIngredient, quantity: parseFloat(quantity) },
      ]);
    }

    setSelectedIngredient("");
    setQuantity("");
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setRecipeIngredients(
      recipeIngredients.filter((ri) => ri.ingredientId !== ingredientId)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || recipeIngredients.length === 0 || !sellingPrice) return;

    onAdd({
      id: uuidv4(),
      name: name.trim(),
      ingredients: recipeIngredients,
      servings: parseInt(servings) || 1,
      sellingPrice: parseFloat(sellingPrice),
    });
  };

  const getIngredientName = (id: string) => {
    return ingredients.find((i) => i.id === id)?.name || "Unknown";
  };

  const getIngredientUnit = (id: string) => {
    return ingredients.find((i) => i.id === id)?.unit || "";
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <h3 className="font-semibold text-gray-900">Create Recipe</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Beef Burger"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servings
          </label>
          <input
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selling Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Ingredients
        </label>
        <div className="flex gap-2">
          <select
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select ingredient...</option>
            {ingredients.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} (${i.costPerUnit.toFixed(2)}/{i.unit})
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qty"
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            disabled={!selectedIngredient || !quantity}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {recipeIngredients.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Recipe Ingredients:</p>
          {recipeIngredients.map((ri) => (
            <div
              key={ri.ingredientId}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
            >
              <span className="text-sm text-gray-700">
                {getIngredientName(ri.ingredientId)} - {ri.quantity}{" "}
                {getIngredientUnit(ri.ingredientId)}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(ri.ingredientId)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={recipeIngredients.length === 0}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Recipe
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
