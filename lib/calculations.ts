import { Ingredient, Recipe, CalculatedRecipe } from './types';

export function calculateRecipeCost(
  recipe: Recipe,
  ingredients: Ingredient[]
): CalculatedRecipe {
  const ingredientMap = new Map(ingredients.map(i => [i.id, i]));

  let totalCost = 0;
  for (const ri of recipe.ingredients) {
    const ingredient = ingredientMap.get(ri.ingredientId);
    if (ingredient) {
      totalCost += ingredient.costPerUnit * ri.quantity;
    }
  }

  const costPerServing = recipe.servings > 0 ? totalCost / recipe.servings : 0;
  const profitPerServing = recipe.sellingPrice - costPerServing;
  const profitMargin = recipe.sellingPrice > 0
    ? (profitPerServing / recipe.sellingPrice) * 100
    : 0;

  return {
    ...recipe,
    totalCost,
    costPerServing,
    profitPerServing,
    profitMargin,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
