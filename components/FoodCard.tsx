import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Food } from "@/types/food";
import { colors } from "@/constants/colors";
import { useRouter } from "expo-router";

interface FoodCardProps {
  food: Food;
  onPress?: () => void;
}

export const FoodCard = ({ food, onPress }: FoodCardProps) => {
  const router = useRouter();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/food-details?id=${food.id}`);
    }
  };
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      {food.image ? (
        <Image source={{ uri: food.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}
      
      <View style={styles.content}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.serving}>{food.servingSize}</Text>
        
        <View style={styles.nutritionRow}>
          <Text style={styles.calories}>{food.calories} cal</Text>
          <View style={styles.macros}>
            <Text style={styles.macro}>P: {food.protein}g</Text>
            <Text style={styles.macro}>C: {food.carbs}g</Text>
            <Text style={styles.macro}>F: {food.fat}g</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: 6,
    padding: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholder: {
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  serving: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calories: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  macros: {
    flexDirection: "row",
    gap: 8,
  },
  macro: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});