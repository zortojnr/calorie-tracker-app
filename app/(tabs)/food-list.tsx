import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useFoodStore } from "@/store/food-store";
import { FoodCard } from "@/components/FoodCard";
import { colors } from "@/constants/colors";
import { Search, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function FoodListScreen() {
  const router = useRouter();
  const foods = useFoodStore((state) => state.foods);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddFood = () => {
    router.push("/add-food");
  };
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Simulate search loading
    if (text.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search foods..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={colors.textSecondary}
          />
          {isLoading && (
            <ActivityIndicator size="small" color={colors.primary} />
          )}
        </View>
        
        <Pressable 
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
          ]}
          onPress={handleAddFood}
        >
          <Plus size={22} color={colors.background} />
        </Pressable>
      </View>
      
      {filteredFoods.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? "No foods found" : "No foods available"}
          </Text>
          <Pressable 
            style={styles.emptyButton}
            onPress={handleAddFood}
          >
            <Text style={styles.emptyButtonText}>Add a new food</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodCard food={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
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
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
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