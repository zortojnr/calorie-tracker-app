import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  Pressable,
  Alert,
} from "react-native";
import { useFoodStore } from "@/store/food-store";
import { FoodCard } from "@/components/FoodCard";
import { colors } from "@/constants/colors";
import { Search } from "lucide-react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MealType } from "@/types/food";

export default function AddEntryScreen() {
  const params = useLocalSearchParams<{ mealType: MealType }>();
  const mealType = params.mealType || "breakfast";
  
  const { foods, addEntry } = useFoodStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("1");
  
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedFood = foods.find((food) => food.id === selectedFoodId);
  
  const handleSelectFood = (foodId: string) => {
    setSelectedFoodId(foodId);
  };
  
  const handleAddEntry = () => {
    if (!selectedFoodId) {
      Alert.alert("Error", "Please select a food first");
      return;
    }
    
    const parsedQuantity = parseFloat(quantity) || 1;
    
    addEntry(selectedFoodId, mealType, parsedQuantity);
    
    Alert.alert(
      "Food Added",
      `${selectedFood?.name} added to your ${mealType}`,
      [
        { 
          text: "OK", 
          onPress: () => router.back()
        }
      ]
    );
  };
  
  const getMealTitle = () => {
    switch (mealType) {
      case "breakfast": return "Breakfast";
      case "lunch": return "Lunch";
      case "dinner": return "Dinner";
      case "snack": return "Snacks";
      default: return "Meal";
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.mealTitle}>Add to {getMealTitle()}</Text>
      
      <View style={styles.searchContainer}>
        <Search size={18} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search foods..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      
      {selectedFood ? (
        <View style={styles.selectedContainer}>
          <Text style={styles.sectionTitle}>Selected Food</Text>
          <FoodCard 
            food={selectedFood} 
            onPress={() => setSelectedFoodId(null)}
          />
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <Pressable 
            style={styles.addButton}
            onPress={handleAddEntry}
          >
            <Text style={styles.addButtonText}>Add to {getMealTitle()}</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard 
              food={item} 
              onPress={() => handleSelectFood(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>Select a Food</Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? "No foods found" : "No foods available"}
              </Text>
              <Pressable 
                style={styles.emptyButton}
                onPress={() => router.push("/add-food")}
              >
                <Text style={styles.emptyButtonText}>Add a new food</Text>
              </Pressable>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  selectedContainer: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginRight: 12,
  },
  quantityInput: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: 80,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    textAlign: "center",
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
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  emptyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: colors.background,
    fontWeight: "500",
  },
});