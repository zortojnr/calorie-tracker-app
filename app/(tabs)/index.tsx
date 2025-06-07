import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useFoodStore } from "@/store/food-store";
import { DailySummary } from "@/components/DailySummary";
import { MealSection } from "@/components/MealSection";
import { colors } from "@/constants/colors";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const { foods, entries, userSettings } = useFoodStore();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const todayEntries = entries.filter((entry) => entry.date === today);
  
  const handleAddFood = () => {
    router.push("/add-food");
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.date}>Today, {new Date().toLocaleDateString()}</Text>
      <Text style={styles.greeting}>Hello there!</Text>
      
      <DailySummary date={today} />
      
      <View style={styles.mealsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <Pressable 
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
            onPress={handleAddFood}
          >
            <Plus size={18} color={colors.primary} />
            <Text style={styles.addButtonText}>Add Food</Text>
          </Pressable>
        </View>
        
        <MealSection
          title="Breakfast"
          mealType="breakfast"
          entries={todayEntries}
          foods={foods}
        />
        
        <MealSection
          title="Lunch"
          mealType="lunch"
          entries={todayEntries}
          foods={foods}
        />
        
        <MealSection
          title="Dinner"
          mealType="dinner"
          entries={todayEntries}
          foods={foods}
        />
        
        <MealSection
          title="Snacks"
          mealType="snack"
          entries={todayEntries}
          foods={foods}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  mealsContainer: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 6,
  },
  addButtonText: {
    color: colors.primary,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.7,
  },
});