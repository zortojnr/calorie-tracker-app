import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FoodEntry, MealType, Food } from "@/types/food";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

interface MealSectionProps {
  title: string;
  mealType: MealType;
  entries: FoodEntry[];
  foods: Food[];
}

export const MealSection = ({ title, mealType, entries, foods }: MealSectionProps) => {
  const router = useRouter();
  const removeEntry = useFoodStore((state) => state.removeEntry);
  
  const mealEntries = entries.filter((entry) => entry.mealType === mealType);
  
  const getTotalCalories = () => {
    return mealEntries.reduce((total, entry) => {
      const food = foods.find((f) => f.id === entry.foodId);
      if (food) {
        return total + food.calories * entry.quantity;
      }
      return total;
    }, 0);
  };
  
  const handleAddFood = () => {
    router.push(`/add-entry?mealType=${mealType}`);
  };
  
  if (mealEntries.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.calories}>0 cal</Text>
        </View>
        
        <Pressable 
          style={({ pressed }) => [
            styles.emptyContainer,
            pressed && styles.pressed,
          ]}
          onPress={handleAddFood}
        >
          <Plus size={20} color={colors.primary} />
          <Text style={styles.emptyText}>Add food to {title.toLowerCase()}</Text>
        </Pressable>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.calories}>{getTotalCalories()} cal</Text>
      </View>
      
      {mealEntries.map((entry) => {
        const food = foods.find((f) => f.id === entry.foodId);
        if (!food) return null;
        
        return (
          <View key={entry.id} style={styles.entryRow}>
            <View style={styles.entryInfo}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.quantity}>
                {entry.quantity > 1 ? `${entry.quantity} × ` : ""}
                {food.servingSize}
              </Text>
            </View>
            
            <View style={styles.entryActions}>
              <Text style={styles.entryCalories}>
                {Math.round(food.calories * entry.quantity)} cal
              </Text>
              <Pressable 
                onPress={() => removeEntry(entry.id)}
                style={({ pressed }) => [
                  styles.removeButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
      
      <Pressable 
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.pressed,
        ]}
        onPress={handleAddFood}
      >
        <Plus size={16} color={colors.primary} />
        <Text style={styles.addText}>Add more</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  calories: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  emptyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  emptyText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "500",
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  entryInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  entryActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  entryCalories: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 13,
    color: colors.danger,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 6,
  },
  addText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.7,
  },
});