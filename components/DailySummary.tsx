import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { NutritionProgressBar } from "./NutritionProgressBar";
import { useFoodStore } from "@/store/food-store";
import { Food, FoodEntry } from "@/types/food";

interface DailySummaryProps {
  date: string;
}

export const DailySummary = ({ date }: DailySummaryProps) => {
  const foods = useFoodStore((state) => state.foods);
  const allEntries = useFoodStore((state) => state.entries);
  const userSettings = useFoodStore((state) => state.userSettings);
  
  // Filter entries by date - memoized to prevent recreating on each render
  const entries = useMemo(() => {
    return allEntries.filter((entry) => entry.date === date);
  }, [allEntries, date]);
  
  // Calculate nutrition values - memoized to prevent recalculation on each render
  const dailyNutrition = useMemo(() => {
    return calculateNutrition(entries, foods);
  }, [entries, foods]);
  
  const caloriesRemaining = Math.max(0, userSettings.calorieGoal - dailyNutrition.calories);
  const caloriePercentage = Math.min(
    Math.round((dailyNutrition.calories / userSettings.calorieGoal) * 100),
    100
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.calorieContainer}>
        <View>
          <Text style={styles.calorieLabel}>Calories</Text>
          <Text style={styles.calorieValue}>{Math.round(dailyNutrition.calories)}</Text>
          <Text style={styles.calorieGoal}>
            {caloriesRemaining > 0
              ? `${Math.round(caloriesRemaining)} remaining`
              : "Goal reached"}
          </Text>
        </View>
        
        <View style={styles.calorieCircle}>
          <Text style={styles.caloriePercentage}>{caloriePercentage}%</Text>
        </View>
      </View>
      
      <View style={styles.macrosContainer}>
        <NutritionProgressBar
          label="Protein"
          current={dailyNutrition.protein}
          goal={userSettings.proteinGoal}
          color={colors.primary}
        />
        <NutritionProgressBar
          label="Carbs"
          current={dailyNutrition.carbs}
          goal={userSettings.carbsGoal}
          color={colors.secondary}
        />
        <NutritionProgressBar
          label="Fat"
          current={dailyNutrition.fat}
          goal={userSettings.fatGoal}
          color="#F4A58D" // Slightly different shade for variety
        />
      </View>
    </View>
  );
};

// Helper function to calculate nutrition totals
const calculateNutrition = (entries: FoodEntry[], foods: Food[]) => {
  return entries.reduce(
    (totals, entry) => {
      const food = foods.find((f) => f.id === entry.foodId);
      if (food) {
        return {
          calories: totals.calories + food.calories * entry.quantity,
          protein: totals.protein + food.protein * entry.quantity,
          carbs: totals.carbs + food.carbs * entry.quantity,
          fat: totals.fat + food.fat * entry.quantity,
        };
      }
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  calorieContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  calorieLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  calorieValue: {
    fontSize: 32,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  calorieGoal: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  calorieCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },
  caloriePercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  macrosContainer: {
    gap: 8,
  },
});