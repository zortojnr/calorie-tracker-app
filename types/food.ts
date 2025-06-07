export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  image?: string;
}

export interface FoodEntry {
  id: string;
  foodId: string;
  date: string; // ISO date string
  mealType: MealType;
  quantity: number;
  timestamp: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserSettings {
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}