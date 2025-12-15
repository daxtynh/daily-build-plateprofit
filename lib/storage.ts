import { Ingredient, Recipe } from './types';

const INGREDIENTS_KEY = 'plateprofit_ingredients';
const RECIPES_KEY = 'plateprofit_recipes';

export function getIngredients(): Ingredient[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(INGREDIENTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveIngredients(ingredients: Ingredient[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
}

export function getRecipes(): Recipe[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(RECIPES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveRecipes(recipes: Recipe[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}
