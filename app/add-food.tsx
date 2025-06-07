import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ScrollView,
  Alert,
} from "react-native";
import { useFoodStore } from "@/store/food-store";
import { colors } from "@/constants/colors";
import { router } from "expo-router";

export default function AddFoodScreen() {
  const addFood = useFoodStore((state) => state.addFood);
  
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [servingSize, setServingSize] = useState("");
  
  const handleSave = () => {
    if (!name || !calories || !servingSize) {
      Alert.alert(
        "Missing Information",
        "Please provide at least a name, calories, and serving size.",
        [{ text: "OK" }]
      );
      return;
    }
    
    addFood({
      name,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      servingSize,
    });
    
    Alert.alert(
      "Food Added",
      `${name} has been added to your food list.`,
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
      <Text style={styles.label}>Food Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Apple, Chicken Breast"
        placeholderTextColor={colors.textSecondary}
      />
      
      <Text style={styles.label}>Serving Size *</Text>
      <TextInput
        style={styles.input}
        value={servingSize}
        onChangeText={setServingSize}
        placeholder="e.g. 100g, 1 medium, 1 cup"
        placeholderTextColor={colors.textSecondary}
      />
      
      <Text style={styles.sectionTitle}>Nutrition Information</Text>
      
      <Text style={styles.label}>Calories *</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="e.g. 150"
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />
      
      <View style={styles.macroRow}>
        <View style={styles.macroInput}>
          <Text style={styles.label}>Protein (g)</Text>
          <TextInput
            style={styles.input}
            value={protein}
            onChangeText={setProtein}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <View style={styles.macroInput}>
          <Text style={styles.label}>Carbs (g)</Text>
          <TextInput
            style={styles.input}
            value={carbs}
            onChangeText={setCarbs}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <View style={styles.macroInput}>
          <Text style={styles.label}>Fat (g)</Text>
          <TextInput
            style={styles.input}
            value={fat}
            onChangeText={setFat}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>
      
      <Text style={styles.note}>* Required fields</Text>
      
      <Pressable 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Food</Text>
      </Pressable>
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 8,
    marginBottom: 16,
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  macroInput: {
    flex: 1,
  },
  note: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});