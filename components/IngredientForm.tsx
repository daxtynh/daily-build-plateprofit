"use client";

import { useState } from "react";
import { Ingredient, Unit } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

const UNITS: Unit[] = ["lb", "oz", "kg", "g", "each", "cup", "tbsp", "tsp", "ml", "l", "gal"];

interface Props {
  onAdd: (ingredient: Ingredient) => void;
  onCancel: () => void;
}

export default function IngredientForm({ onAdd, onCancel }: Props) {
  const [name, setName] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [unit, setUnit] = useState<Unit>("lb");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !costPerUnit) return;

    onAdd({
      id: uuidv4(),
      name: name.trim(),
      costPerUnit: parseFloat(costPerUnit),
      unit,
    });

    setName("");
    setCostPerUnit("");
    setUnit("lb");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <h3 className="font-semibold text-gray-900">Add Ingredient</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredient Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Ground Beef"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost per Unit ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Add Ingredient
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
