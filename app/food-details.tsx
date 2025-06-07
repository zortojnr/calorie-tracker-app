import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Pressable,
  Alert,
} from "react-native";
import { useFoodStore } from "@/store/food-store";
import { colors } from "@/constants/colors";
import { useLocalSearchParams, router } from "expo-router";
import { MealType } from "@/types/food";

export default function FoodDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const foodId = params.id;
  
  const { foods, addEntry } = useFoodStore();
  const food = foods.find((f) => f.id === foodId);
  
  const [selectedMeal, setSelectedMeal] = useState<MealType>("breakfast");
  
  if (!food) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Food not found</Text>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }
  
  const handleAddToMeal = () => {
    addEntry(food.id, selectedMeal, 1);
    
    Alert.alert(
      "Food Added",
      `${food.name} added to your ${selectedMeal}`,
      [
        { 
          text: "OK", 
          onPress: () => router.back()
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {food.image ? (
          <Image source={{ uri: food.image }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]} />
        )}
        
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.serving}>{food.servingSize}</Text>
      </View>
      
      <View style={styles.nutritionCard}>
        <Text style={styles.sectionTitle}>Nutrition Facts</Text>
        
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Calories</Text>
          <Text style={styles.nutritionValue}>{food.calories}</Text>
        </View>
        
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Protein</Text>
          <Text style={styles.nutritionValue}>{food.protein}g</Text>
        </View>
        
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Carbohydrates</Text>
          <Text style={styles.nutritionValue}>{food.carbs}g</Text>
        </View>
        
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Fat</Text>
          <Text style={styles.nutritionValue}>{food.fat}g</Text>
        </View>
      </View>
      
      <View style={styles.addToMealCard}>
        <Text style={styles.sectionTitle}>Add to Meal</Text>
        
        <View style={styles.mealButtons}>
          <Pressable 
            style={[
              styles.mealButton,
              selectedMeal === "breakfast" && styles.selectedMealButton,
            ]}
            onPress={() => setSelectedMeal("breakfast")}
          >
            <Text 
              style={[
                styles.mealButtonText,
                selectedMeal === "breakfast" && styles.selectedMealButtonText,
              ]}
            >
              Breakfast
            </Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.mealButton,
              selectedMeal === "lunch" && styles.selectedMealButton,
            ]}
            onPress={() => setSelectedMeal("lunch")}
          >
            <Text 
              style={[
                styles.mealButtonText,
                selectedMeal === "lunch" && styles.selectedMealButtonText,
              ]}
            >
              Lunch
            </Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.mealButton,
              selectedMeal === "dinner" && styles.selectedMealButton,
            ]}
            onPress={() => setSelectedMeal("dinner")}
          >
            <Text 
              style={[
                styles.mealButtonText,
                selectedMeal === "dinner" && styles.selectedMealButtonText,
              ]}
            >
              Dinner
            </Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.mealButton,
              selectedMeal === "snack" && styles.selectedMealButton,
            ]}
            onPress={() => setSelectedMeal("snack")}
          >
            <Text 
              style={[
                styles.mealButtonText,
                selectedMeal === "snack" && styles.selectedMealButtonText,
              ]}
            >
              Snack
            </Text>
          </Pressable>
        </View>
        
        <Pressable 
          style={styles.addButton}
          onPress={handleAddToMeal}
        >
          <Text style={styles.addButtonText}>Add to Meal</Text>
        </Pressable>
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
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.background,
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: colors.border,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
    textAlign: "center",
  },
  serving: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  nutritionCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  nutritionLabel: {
    fontSize: 16,
    color: colors.text,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  addToMealCard: {
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
  mealButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  mealButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  selectedMealButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  mealButtonText: {
    color: colors.text,
    fontWeight: "500",
  },
  selectedMealButtonText: {
    color: colors.background,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});