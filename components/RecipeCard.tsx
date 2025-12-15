"use client";

import { CalculatedRecipe, Ingredient } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/calculations";

interface Props {
  recipe: CalculatedRecipe;
  ingredients: Ingredient[];
  onDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, ingredients, onDelete }: Props) {
  const getIngredientDetails = (ingredientId: string) => {
    return ingredients.find((i) => i.id === ingredientId);
  };

  const marginColor =
    recipe.profitMargin >= 70
      ? "text-green-600"
      : recipe.profitMargin >= 50
      ? "text-yellow-600"
      : "text-red-600";

  const marginBg =
    recipe.profitMargin >= 70
      ? "bg-green-50 border-green-200"
      : recipe.profitMargin >= 50
      ? "bg-yellow-50 border-yellow-200"
      : "bg-red-50 border-red-200";

  return (
    <div className={`p-4 rounded-lg border ${marginBg}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{recipe.name}</h3>
        <button
          onClick={() => onDelete(recipe.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Cost per Serving</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(recipe.costPerServing)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Selling Price</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(recipe.sellingPrice)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Profit per Serving</p>
          <p className={`text-xl font-bold ${marginColor}`}>
            {formatCurrency(recipe.profitPerServing)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Profit Margin</p>
          <p className={`text-xl font-bold ${marginColor}`}>
            {formatPercent(recipe.profitMargin)}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <p className="text-sm text-gray-500 mb-2">
          Ingredients ({recipe.servings} serving{recipe.servings > 1 ? "s" : ""}
          ):
        </p>
        <div className="space-y-1">
          {recipe.ingredients.map((ri) => {
            const ing = getIngredientDetails(ri.ingredientId);
            if (!ing) return null;
            const cost = ing.costPerUnit * ri.quantity;
            return (
              <div
                key={ri.ingredientId}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-600">
                  {ing.name} ({ri.quantity} {ing.unit})
                </span>
                <span className="text-gray-900">{formatCurrency(cost)}</span>
              </div>
            );
          })}
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200">
            <span className="text-gray-700">Total Cost</span>
            <span className="text-gray-900">
              {formatCurrency(recipe.totalCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
