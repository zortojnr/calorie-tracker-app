import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Food, FoodEntry, MealType, UserSettings } from "@/types/food";
import { mockFoods } from "@/mocks/foods";

interface FoodState {
  foods: Food[];
  entries: FoodEntry[];
  userSettings: UserSettings;
  
  // Food actions
  addFood: (food: Omit<Food, "id">) => void;
  
  // Entry actions
  addEntry: (foodId: string, mealType: MealType, quantity: number) => void;
  removeEntry: (entryId: string) => void;
  getEntriesByDate: (date: string) => FoodEntry[];
  
  // Settings actions
  updateUserSettings: (settings: Partial<UserSettings>) => void;
}

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Generate a simple UUID
const generateId = () => Math.random().toString(36).substring(2, 15);

export const useFoodStore = create<FoodState>()(
  persist(
    (set, get) => ({
      foods: mockFoods,
      entries: [],
      userSettings: {
        calorieGoal: 2000,
        proteinGoal: 150,
        carbsGoal: 200,
        fatGoal: 65,
      },
      
      addFood: (food) => {
        const newFood: Food = {
          ...food,
          id: generateId(),
        };
        set((state) => ({
          foods: [...state.foods, newFood],
        }));
      },
      
      addEntry: (foodId, mealType, quantity) => {
        const newEntry: FoodEntry = {
          id: generateId(),
          foodId,
          date: getTodayString(),
          mealType,
          quantity,
          timestamp: Date.now(),
        };
        set((state) => ({
          entries: [...state.entries, newEntry],
        }));
      },
      
      removeEntry: (entryId) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== entryId),
        }));
      },
      
      getEntriesByDate: (date) => {
        return get().entries.filter((entry) => entry.date === date);
      },
      
      updateUserSettings: (settings) => {
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            ...settings,
          },
        }));
      },
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);