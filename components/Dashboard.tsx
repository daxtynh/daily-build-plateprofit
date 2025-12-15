"use client";

import { CalculatedRecipe } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/calculations";

interface Props {
  recipes: CalculatedRecipe[];
}

export default function Dashboard({ recipes }: Props) {
  if (recipes.length === 0) {
    return null;
  }

  const sortedByProfit = [...recipes].sort(
    (a, b) => b.profitMargin - a.profitMargin
  );
  const mostProfitable = sortedByProfit[0];
  const leastProfitable = sortedByProfit[sortedByProfit.length - 1];

  const avgMargin =
    recipes.reduce((sum, r) => sum + r.profitMargin, 0) / recipes.length;

  const avgCost =
    recipes.reduce((sum, r) => sum + r.costPerServing, 0) / recipes.length;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Profit Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Recipes</p>
          <p className="text-2xl font-bold text-gray-900">{recipes.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Avg Margin</p>
          <p
            className={`text-2xl font-bold ${
              avgMargin >= 70
                ? "text-green-600"
                : avgMargin >= 50
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {formatPercent(avgMargin)}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Avg Cost/Serving</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(avgCost)}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Target Margin</p>
          <p className="text-2xl font-bold text-green-600">70%+</p>
        </div>
      </div>

      {recipes.length >= 2 && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600 font-medium">Most Profitable</p>
            <p className="text-lg font-semibold text-gray-900">
              {mostProfitable.name}
            </p>
            <p className="text-green-600">
              {formatPercent(mostProfitable.profitMargin)} margin -{" "}
              {formatCurrency(mostProfitable.profitPerServing)} profit/serving
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-600 font-medium">
              Needs Attention
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {leastProfitable.name}
            </p>
            <p className="text-red-600">
              {formatPercent(leastProfitable.profitMargin)} margin -{" "}
              {formatCurrency(leastProfitable.profitPerServing)} profit/serving
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
