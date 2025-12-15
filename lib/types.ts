export type Unit = 'lb' | 'oz' | 'kg' | 'g' | 'each' | 'cup' | 'tbsp' | 'tsp' | 'ml' | 'l' | 'gal';

export interface Ingredient {
  id: string;
  name: string;
  costPerUnit: number;
  unit: Unit;
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  servings: number;
  sellingPrice: number;
}

export interface CalculatedRecipe extends Recipe {
  totalCost: number;
  costPerServing: number;
  profitPerServing: number;
  profitMargin: number;
}
